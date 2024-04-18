import React from 'react';
import axiosInstance from '../utils/axiosConfig.js';
import useFetchItems from '../hooks/useFetchItems.jsx';
import ItemCreator from '../components/ItemCreator.jsx';
import ItemsDisplay from '../components/ItemsDisplay.jsx';

const ItemsContainer = () => {
  const { items, isLoading, error, setItems } = useFetchItems();
  
  const addItemToState = (item) => setItems((prevItems) => [...prevItems, item]);
  
  const deleteItemFromState = async (id) => {
    try {
      await axiosInstance.delete(`/items/${id}`);
      setItems((prevItems) => prevItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };
  
  return (
    <div>
      <ItemCreator onItemCreate={addItemToState} />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ItemsDisplay items={items} onDeleteItem={deleteItemFromState} />
      )}
    </div>
  );
};

export default ItemsContainer;