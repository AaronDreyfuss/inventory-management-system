import React, { useState } from 'react';
import axiosInstance from '../utils/axiosConfig.js';

const ItemCreator = ({ onItemCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedQuantity = parseInt(quantity, 10);
    if (!name || !description || isNaN(parsedQuantity)) return;
  
    try {
      const { data } = await axiosInstance.post('/items', { name, description, quantity: parsedQuantity });
      onItemCreate(data);
      setName('');
      setDescription('');
      setQuantity('');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemCreator;