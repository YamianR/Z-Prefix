import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://localhost:8080/item/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch item');
      }
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToMyItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in');
      }
      const response = await fetch('http://localhost:8080/user/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          item_name: item.item_name,
          description: item.description,
          quantity: item.quantity,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to user');
      }

      alert('Item added to your items successfully!');
      navigate('/user');

    } catch (error) {
      console.error(error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Item Detail</h2>
      <p>Name: {item.itemName}</p>
      <p>Description: {item.description}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={handleAddToMyItems}>Add to My Items</button>
    </div>
  );
};

export default ItemDetail;