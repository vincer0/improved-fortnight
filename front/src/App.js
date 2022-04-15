import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsSelector } from './store/reducers/productsSlice';

import { fetchProducts } from './store/reducers/productsSlice';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector);

  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts);
  }, [dispatch]);

  return <div className="App">Hello</div>;
};

export default App;
