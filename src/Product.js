import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Product = (product) => {
const { userId } = useParams();
  return <li className='product-card'>
    <h3>Name: {product.name}</h3>
    <p className='product-color'>Color: {product.color}</p>
    <p>Active: {product.active ? 'Yes' : 'No'}</p>
    <p>Summary: {product.summary}.</p>
    {!userId && <div>
      Created by: <Link to={`/users/${product.created_by_id}`}>{product.user.name}</Link>
    </div>}
    <br />
  </li>
}

export default Product;