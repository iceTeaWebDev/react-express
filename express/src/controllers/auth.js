import User from "../models/user";
import { signInSchema, signupSchema } from "../schemas/auth";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        // validate
        const {error} = signupSchema.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.details.map((err) => err.message);

            return res.status(400).json({
                message: errors
            })
        }

        // check user exist
        const userExist = await User.findOne({email: req.body.email});
        if(userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            });
        }

        // hash password and create user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        const accessToken = jwt.sign({_id: user._id}, "123456", {expiresIn: "1d"});

        return res.status(201).json({
            message: "Đăng ký tài khoản thành công",
            accessToken
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const signin = async (req, res) => {
    try {
        // validate
        const {email, password} = req.body;
        const {error} = signInSchema.validate({email, password}, {abortEarly: false});
        if(error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            })
        }

        // check email
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Tài khoản không tồn tại"});
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: "Mật khẩu không khớp"});
        }
        const token = jwt.sign({_id: user._id}, "123456");

        res.status(200).json({
            data: user._id,
            accessToken: token,
            message: "Đăng nhập thành công"
        })

    } catch (error) {
        if(error.name == "ValidationError") {
            return res.status(400).json({message: error.errors[0]});
        }
        return res.status(500).json({message: "Internal server Error"})
    }

}