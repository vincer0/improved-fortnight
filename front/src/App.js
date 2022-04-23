import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsSelector, logsSelector } from './store/reducers/productsSlice';

import { fetchProducts } from './store/reducers/productsSlice';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector);
  const logs = useSelector(logsSelector);

  useEffect(() => {
    if (logs.status === 'Fulfilled') {
      return;
    }

    //dispatch(fetchProducts());
  }, [dispatch, logs.status]);

  return <div className="App">Hello</div>;
};

export default App;
