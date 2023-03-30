import React, { useState, useEffect } from 'react'
import { getAllProducts } from '../api/product'
import ProductList from '../components/product/ProductList'
import { iProduct } from '../interface/product'

const Product = () => {
    const [products, setProducts] = useState<iProduct[]>([])
    useEffect(() => {
        (async () => {
            const { data } = await getAllProducts();
            setProducts(data);
        })()
    }, [])

    return (
        <div>
            <ProductList data={products} />
        </div>
    )
}

export default Product