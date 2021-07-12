import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Products from './Products';

const UserProfile = ({ users }) => {
  const { userId } = useParams();
  const history = useHistory();
  const currentUser = users.find((user) => user.id === Number(userId));
  
  return <React.Fragment>
    <button onClick={history.goBack}>Go Back</button>
    <h1 className='center'>{currentUser.name}'s Page</h1>
    <Products userId={userId} users={users} />
  </React.Fragment>
}

export default UserProfile;