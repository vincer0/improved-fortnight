import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/fetchProducts';

const initialState = {
  products: [],
  status: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.rejected]: (state) => {
      state.status = 'Rejected';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.status = 'Fulfilled';
    },
  },
});

export const productsSelector = (state) => state.products;

export default productsSlice.reducer;
