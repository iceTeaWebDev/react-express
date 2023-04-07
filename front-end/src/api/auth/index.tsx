import instance from "..";
import { iLogin, iRegister } from "../../interface/auth";

export const login = (data: iLogin) => {
    return instance.post("/signin", data);
}

export const register = (data: iRegister) => {
    return instance.post("/signup", data);
}