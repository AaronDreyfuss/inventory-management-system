import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig.js';

const useFetchItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axiosInstance.get('/items');
        setItems(data);
      } catch (error) {
        setError('Failed to fetch items.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);
  
  return { items, isLoading, error, setItems };
};

export default useFetchItems;