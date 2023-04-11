import instance from "..";

export const getAllCategory = () => {
    return instance.get('/categories');
}
