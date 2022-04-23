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
  message: 'None',
  status: 'None',
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await scrapProducts();
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
      state.status = 'Pending';
      state.message = 'Pending';
    },
    [fetchProducts.rejected]: (state) => {
      state.status = 'Rejected';
      state.message = 'Rejected';
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

export const productsSelector = ({ products }) => products.products;
export const paginationParametersSelector = ({ products }) =>
  products.paginationParameters;
export const isLoadingSelector = ({ products }) => products.loading;
export const logsSelector = ({ products }) => ({
  message: products.message,
  status: products.status,
});

export default productsSlice.reducer;
