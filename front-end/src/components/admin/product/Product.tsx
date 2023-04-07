import React, {useEffect, useState} from 'react'
import ProductList from './ProductList'
import { getAllProducts } from '../../../api/product'
import { iProduct } from '../../../interface/product'
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
      <ProductList data={products}/>
    </div>
  )
}

export default Product