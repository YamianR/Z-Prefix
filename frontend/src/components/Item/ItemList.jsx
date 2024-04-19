import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/items');
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="item-list">
      {items.map(item => (
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
  );
};

export default ItemList;