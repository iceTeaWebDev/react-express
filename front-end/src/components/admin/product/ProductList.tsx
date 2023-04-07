import React from 'react'
import { iProduct } from '../../../interface/product'
import SliderComponent from './ImageSlider';
interface iProps {
    data: iProduct[];
}
const ProductList = ({data}: iProps) => {
  return (
    <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-4">
                {data.map((item, index) => (
                    <div className="card col" style={{ width: '18rem' }} key={index}>
                        <div className="card-body">
                            <SliderComponent images={item.images} key={index}/>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Price: ${item.price}</p>
                            <a href="#" className="btn btn-primary me-2">Update</a>
                            <a href="#" className="btn btn-danger">Delete</a>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Created: {new Date(item.createdAt).toLocaleDateString()}</small>
                            <br />
                            <small className="text-muted">Last Updated: {new Date(item.updatedAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default ProductList