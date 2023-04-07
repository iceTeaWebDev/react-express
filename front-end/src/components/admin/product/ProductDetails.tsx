import React, { useEffect, useState } from 'react'
import { iProduct } from '../../../interface/product'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../../../api/product';
export interface IParams extends Record<string, string | undefined> {
    id?: string;
}
const ProductDetails = () => {
    const { id } = useParams<IParams>();
    const [product, setProduct] = useState<iProduct>({
        _id: "",
        name: "",
        price: 0,
        images: [],
        description: "",
        categories: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
        deletedAt: null,
    });
    useEffect(() => {
        (async () => {
            const { data } = await getOneProduct(id ?? '');
            setProduct(data);
        })()
    }, [id])
    return (
        <>{product.images[0] &&
            (<div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={product.images[0].url}
                            alt={product.images[0].alt}
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p className="lead">{product.description}</p>
                        <h3>{product.price}</h3>
                        <ul className="list-unstyled">
                            {product.categories.map((category, index) => (
                                <li key={index}>{category.name}</li>
                            ))}
                        </ul>
                        {/* add other product details */}
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default ProductDetails