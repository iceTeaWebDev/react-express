import instance from "..";
import { iProduct } from "../../interface/product";
export const getAllProducts = () => {
    return instance.get('/products');
}

export const getOneProduct = (id: string) => {
    return instance.get('/products/'+id+"?_embed=categories");
}

export const createProduct = (data: iProduct) => {
    return instance.post('/products', data);
}

export const updateProduct = (data: iProduct, id: string) => {
    return instance.put('/products/' + id, data);
}

export const deleteProduct = (id: string) => {
    return instance.delete('products/'+id);
}