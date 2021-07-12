import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import reducer from './genericReducer';
import Products from './Products';
import UserProfile from './UserProfile';
import './App.css';

const history = createBrowserHistory();

function App() {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle',
    response: null,
    error: null,
  })

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'started' });
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        dispatch({ type: 'error', error: 'Error fetching user data' });
        return
      }
      const json = await response.json();
      dispatch({ type: 'fulfilled', response: json });
    }
    fetchUsers();
  }, []);

  const { status, response, error } = state;

  if (status === 'idle' || status === 'started') {
    return <div>Loading user data...</div>
  }

  if (status === 'error') {
    return <React.Fragment>
      <div>Error retreiving user data!</div>
      <p>{error}</p>
    </React.Fragment>
  }

  if (status === 'fulfilled') {
    return <Router history={history}>
      <Switch>
        <Route path='/products/:pageId'>
          <Products users={response} />
        </Route>
        <Route path='/users/:userId'>
          <UserProfile users={response} />
        </Route>
        <Redirect from='/' to={{ pathname: '/products/1' }} />
      </Switch>
    </Router>;
  }
}

export default App;
