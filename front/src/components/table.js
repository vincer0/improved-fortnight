import React from 'react';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/reducers/productsSlice';

import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const StyledTable = styled('div')(() => ({
  height: 'calc(100% - 72px)',
}));

const Table = () => {
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
    },
    {
      field: 'currentPrice',
      headerName: 'Current Price',
      flex: 1,
    },
    {
      field: 'lastPrice',
      headerName: 'Before discount',
      flex: 1,
    },
    {
      field: 'difference',
      headerName: 'Difference',
      flex: 1,
    },
    {
      field: 'link',
      headerName: 'Link',
      renderCell: (params) => (
        <a href={`https://x-kom.pl${params.value}`}>Link</a>
      ),
    },
    {
      field: 'image',
      headerName: 'Image',
      renderCell: (params) => (
        <img src={params.value} width={100} height={100} alt="gpu"></img>
      ),
    },
  ];
  const { items: itemsRaw } = useSelector(productsSelector);

  const getIndexedItems = () => {
    return itemsRaw.map((item, index) => ({
      id: index,
      name: item.name,
      currentPrice: item.currentPrice,
      lastPrice: item.lastPrice,
      difference:
        item.lastPrice === 'b/d'
          ? 0
          : Number(item.lastPrice) - item.currentPrice,
      link: item.link,
      image: item.image,
    }));
  };

  return (
    <StyledTable className="styled-table">
      <DataGrid
        rows={getIndexedItems()}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
      ></DataGrid>
    </StyledTable>
  );
};

export default Table;
