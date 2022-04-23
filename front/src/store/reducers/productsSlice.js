import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts as scrapProducts } from '../../api/fetchProducts';

const initialState = {
  products: {
    items: [],
    total: 0,
  },
  paginationParameters: [
    {
      success: false,
      current: '',
      all: '',
      pages: 0,
    },
  ],
  message: '',
  status: '',
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await scrapProducts();
    console.log('response: ', response);

    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.rejected]: (state) => {
      state.status = 'Rejected';
      state.loading = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.paginationParameters = action.payload.paginationParameters;
      state.message = action.payload.message;
      state.status = 'Fulfilled';
      state.loading = false;
    },
  },
});

export const productsSelector = (state) => state.products;
export const paginationParameters = (state) => state.paginationParameters;
export const isLoadingSelector = (state) => state.loading;
export const logsSelector = (state) => ({
  message: state.message,
  status: state.status,
});

export default productsSlice.reducer;
