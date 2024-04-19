import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

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

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Item Detail</h2>
      <p>Name: {item.itemName}</p>
      <p>Description: {item.description}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default ItemDetail;