import React from 'react'
import { iProduct } from '../../interface/product'
interface iProps {
    data: iProduct[];
}
const ProductList = ({ data }: iProps) => {
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-4">
            {data.map((item, index) => (
                <div className="card col" style={{ width: '18rem' }} key={index}>
                    <img src="https://via.placeholder.com/286x180" className="card-img-top" alt="Product Image" />
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Price: ${item.price}</p>
                        <p className="card-text">Quality: {item.quality}</p>
                        <p className="card-text">Status: {item.status ? 'Available' : 'Sold Out'}</p>
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