import instance from "..";
import { iProduct } from "../../interface/product";
export const getAllProducts = () => {
    return instance.get('/products');
}

export const getOneProduct = (id: number | string) => {
    return instance.get('/products'+id);
}

export const createProduct = (data: iProduct) => {
    return instance.post('/products', data);
}

export const updateProduct = (data: iProduct, id: string | number) => {
    return instance.put('/products' + id, data);
}

export const deleteProduct = (id: number | string) => {
    return instance.delete('products'+id);
}