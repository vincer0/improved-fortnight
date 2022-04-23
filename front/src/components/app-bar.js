import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchProducts } from '../store/reducers/productsSlice';

import { styled } from '@mui/system';
import { Button } from '@mui/material';

const StyledAppBar = styled('div')(() => {
  return {
    backgroundColor: '#218cea',
    position: 'fixed',
    width: '100%',
    height: 56,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    boxShadow:
      '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20);',
  };
});

const AppBar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchProducts());
  };

  return (
    <StyledAppBar>
      <div className="title-section">
        <p>Simple scrapper</p>
      </div>
      <div className="buttons-section">
        <Button onClick={handleClick} sx={{ color: 'white' }} variant="text">
          Reload
        </Button>
      </div>
    </StyledAppBar>
  );
};

export default AppBar;
