import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  logsSelector,
  paginationParametersSelector,
} from '../store/reducers/productsSlice';

import { styled } from '@mui/system';

const StyledStats = styled('div')(() => ({
  padding: 16,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  '& > p': {},
  '& > p > span': {
    '&.success': {
      color: 'green',
    },
    '&.error': {
      color: 'red',
    },
  },
}));

const Stats = () => {
  const logs = useSelector(logsSelector);
  const pagination = useSelector(paginationParametersSelector);

  console.log(pagination, logs);

  return (
    <StyledStats>
      <p>
        Status:{' '}
        <span
          className={clsx(logs.status === 'Fulfilled' ? 'success' : 'error')}
        >
          {logs.status}
        </span>
      </p>
      <p>
        Message:{' '}
        <span className={clsx(logs.status === 'Success' ? 'success' : 'error')}>
          {logs.message}
        </span>
      </p>
    </StyledStats>
  );
};

export default Stats;
