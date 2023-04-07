import jwt from 'jsonwebtoken';
import User from '../models/user';

export const checkPermission = async (req, res, next) => {
    try {
        // check token
        const token = req.headers.authrization?.split(" ")[1];
        if (!token) {
            throw new Error("Bạn chưa đăng nhập");
        }

        // decoded token
        const decoded = jwt.verify(token, "123456");

        // find user
        const user = await User.findById(decoded._id);

        // check user
        if (!user || user.role !== "admin") {
            throw new Error("Bạn không có quyền truy cập tài nguyên này");
        }

        // next
        next();
    } catch (error) {
        return res.status(404).json({
            message: error.message || "Token không hợp lệ"
        })
    }
}