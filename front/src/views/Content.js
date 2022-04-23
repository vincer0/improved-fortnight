import React from 'react';
import { styled } from '@mui/system';

const StyledContent = styled('div')(() => ({
  height: '100%',
  width: '100%',
  padding: 16,
  paddingTop: 56 + 16,
}));

const Content = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};

export default Content;
