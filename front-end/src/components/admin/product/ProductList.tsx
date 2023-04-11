import React from 'react'
import { iProduct } from '../../../interface/product'
import SliderComponent from './ImageSlider';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../../../api/product';
interface iProps {
    data: iProduct[];
    onRemove: Function;
}
const ProductList = ({data, onRemove}: iProps) => {
  return (
    <div className="container">
        <Link to="add" className="btn btn-primary me-2 mb-2">Add</Link>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-4">
                {data.map((item, index) => (
                    <div className="card col" style={{ width: '18rem' }} key={index}>
                        <div className="card-body">
                            <SliderComponent images={item.images} key={index}/>
                            <Link to={item._id}><h5 className="card-title">{item.name}</h5></Link>
                            <p className="card-text">Price: ${item.price}</p>
                            <Link to={`${item._id}/update`} className="btn btn-primary me-2">Update</Link>
                            <button onClick={() => onRemove(item._id)} className="btn btn-danger">Delete</button>
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