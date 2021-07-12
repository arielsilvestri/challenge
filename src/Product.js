import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Product = (product) => {
const { userId } = useParams();
  return <li>
    <div>Name: {product.name}</div>
    <div>Color: {product.color}</div>
    <div>Active: {product.active ? 'Yes' : 'No'}</div>
    <div>Summary: {product.summary}</div>
    {!userId && <div>
      Created by: <Link to={`/users/${product.created_by_id}`}>{product.user.name}</Link>
    </div>}
    <br />
  </li>
}

export default Product;