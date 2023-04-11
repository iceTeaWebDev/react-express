import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import { deleteProduct, getAllProducts } from '../../../api/product'
import { iProduct } from '../../../interface/product'
const Product = () => {
  const [products, setProducts] = useState<iProduct[]>([])
  const handleRemove = (id: string) => {
    deleteProduct(id).then(res => setProducts(products.filter(item => item._id !== id)));
  }
  useEffect(() => {
    (async () => {
      const { data } = await getAllProducts();
      setProducts(data);
    })()
  }, [])
  return (
    <div>
      <ProductList data={products} onRemove={handleRemove} />
    </div>
  )
}

export default Product