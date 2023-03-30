import { redirect } from "react-router-dom";

export const checkAuthLoader =  () => {
    const data = JSON.parse(localStorage.getItem('user') || '')
    console.log(data.token);
    if (!data.token) {
        redirect('/login');
    }
    return null;
}