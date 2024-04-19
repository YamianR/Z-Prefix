import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    fetchUserItems();
  }, []);

  const fetchUserItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }
      const response = await fetch('http://localhost:8080/user/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user items');
      }
      const data = await response.json();
      setUserItems(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="user-page-container">
      <h2>Your Items</h2>
      <div className="user-page-create-item">
        <Link to="/create-item" className="user-page-button">Create Item</Link>
      </div>
      <ul>
        {userItems.map(item => (
          <li key={item.id}>{item.itemName}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
