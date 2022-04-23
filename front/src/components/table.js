import React from 'react';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const StyledTable = styled('div')(() => ({}));

const Table = () => {
  const columns = [];
  const items = [];

  return (
    <StyledTable>
      <DataGrid
        rows={items}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      ></DataGrid>
    </StyledTable>
  );
};

export default Table;
