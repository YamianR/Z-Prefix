import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [userItems, setUserItems] = useState([]);
  const navigate = useNavigate();

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
          Authorization: `${token}`,
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
      <div className="user-page-buttons">
        <Link to="/create-item" className="user-page-button">Create Item</Link>
        <button className="user-page-button" onClick={() => navigate('/items')}>View All Items</button>
      </div>
      <div className="item-list">
        {userItems.map(item => (
          <Link key={item.id} to={`/item/${item.id}`} className="item-link">
            <div className="item-card">
              <div className="upper-box">
                <div className="item-name">{item.item_name}</div>
                <div className="quantity">{item.quantity}</div>
              </div>
              <div className="lower-box">{item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default UserPage;