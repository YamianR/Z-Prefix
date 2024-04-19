import React, { useState } from 'react';

const CreateItem = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleCreateItem = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); 

      const response = await fetch('http://localhost:8080/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ itemName, description, quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to create item');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-item-container">
      <h2 className="create-item-heading">Create Item</h2>
      <div className="create-item-content">
        <input className="create-item-input" type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Item Name" />
        <input className="create-item-input" type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <input className="create-item-input" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity" />
        <button className="create-item-button" onClick={handleCreateItem}>Create Item</button>
      </div>
    </div>
  );
};

export default CreateItem;