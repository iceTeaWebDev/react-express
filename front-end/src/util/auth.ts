import { redirect } from "react-router-dom";

export const checkAuthLoader =  () => {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    const token = data.accessToken;
    return token;
}