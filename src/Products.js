import React, { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import reducer from './genericReducer';
import Product from './Product';

const Products = ({ userId, users }) => {
  const { pageId } = useParams();
  const [ state, dispatch ] = useReducer(reducer, {
    status: 'idle',
    response: { products: null, totalItems: null },
    error: null,
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'started' });
      // Making a decision not to paginate users/:userId route for now, but I can see how this might get a little out of hand if product creation was supported.
      const queryParams = userId ? `created_by_id=${userId}` : `_page=${pageId}&_limit=25`;
      const response = await fetch(`http://localhost:3001/products?${queryParams}`);
      if (!response.ok) {
        dispatch({ type: 'error', error: 'Error fetching product data' });
        return
      }
      const json = await response.json();
      const mappedProducts = json.map((product) => ({
        ...product,
        user: users.find((user) => Number(user.id) === Number(product.created_by_id))
      }))
      const totalItems = response.headers.get('X-Total-Count');
      dispatch({ type: 'fulfilled', response: { products: mappedProducts, totalItems } });
    }

    getProducts();
  }, [pageId, userId, users]);

  const getNextRoute = () => {
    const pageIdNum = Number(pageId);
    return `/products/${String(pageIdNum + 1)}`;
  }
  const getPreviousRoute = () => {
    const pageIdNum = Number(pageId)
    return `/products/${String(pageIdNum - 1)}`;
  }

  const { status, response, error } = state;
  const { products, totalItems } = response

  if (status === 'idle' || status === 'started') {
    return <div>Loading product data...</div>;
  }

  if (!userId && status === 'fulfilled' && !totalItems) {
    return <React.Fragment>
      <div>No Products</div>
      <Link to='/products/1'>Back to Page 1</Link>
    </React.Fragment>;
  }

  if (status === 'error') {
    return <React.Fragment>
      <div>Error retreiving product data!</div>
      <p>{error}</p>
    </React.Fragment>
  }

  if (status === 'fulfilled') {
    return <React.Fragment>
      {!userId && <div>Page {pageId} of {totalItems / 25}</div>}
      {!userId && <ul>
        {Number(pageId) !== 1 && <li><Link to='/products/1'>First Page</Link></li>}
        {Number(pageId) > 1 && <li><Link to={getPreviousRoute()}>Previous Page</Link></li>}
        {Number(pageId) !== (totalItems / 25) && <React.Fragment>
          <li><Link to={getNextRoute()}>Next Page</Link></li>
          <li><Link to={`/products/${totalItems / 25}`}>Last Page</Link></li>
          </React.Fragment>}
      </ul>}
      <h2>Products</h2>
      <ul>
        {products.map((product) => <Product key={product.id} {...product} />)}
      </ul>
    </React.Fragment>
  }
}

export default Products;