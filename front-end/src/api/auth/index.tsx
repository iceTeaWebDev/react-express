import instance from "..";
import { iUser } from "../../interface/auth";

export const login = (data: iUser) => {
    return instance.post("/signin", data);
}