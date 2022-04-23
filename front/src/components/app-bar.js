import React from 'react';
import { styled } from '@mui/system';

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
  };
});

const AppBar = () => {
  return (
    <StyledAppBar>
      <p>Simple scrapper</p>
    </StyledAppBar>
  );
};

export default AppBar;
