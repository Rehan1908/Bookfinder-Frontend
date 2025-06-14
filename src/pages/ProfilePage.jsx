import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      {user ? (
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <div>
          <p>Please log in to view your profile.</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;