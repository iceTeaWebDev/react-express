import instance from "..";
import { iProduct } from "../../interface/product";

interface ProductFormData {
    name: string;
    price: number;
    description: string;
    categories: string[];
    images: File[];
}

export const getAllProducts = () => {
    return instance.get('/products');
}

export const getOneProduct = (id: string | undefined) => {
    return instance.get('/products/' + id + "?_embed=categories");
}

export const createProduct = (data: ProductFormData) => {
    const { name, price, description, categories, images } = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));
    formData.append('description', description);
    formData.append('categories', JSON.stringify(categories));
    images.forEach(image => {
        formData.append('images', image);
    });
    return instance.post('/products', formData, {
        headers: {
            'Content-Type': `multipart/form-data`

        }
    });
}

export const updateProduct = (data: ProductFormData, id: string | undefined) => {
    const { name, price, description, categories, images } = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', String(price));
    formData.append('description', description);
    formData.append('categories', JSON.stringify(categories));
    images && images.forEach(image => {
        formData.append('images', image);
    });
    return instance.put('/products/' + id, formData, {
        headers: {
            'Content-Type': `multipart/form-data`

        }
    });
}

export const deleteProduct = (id: string) => {
    return instance.delete('products/' + id + "?isHardDelete=true");
}