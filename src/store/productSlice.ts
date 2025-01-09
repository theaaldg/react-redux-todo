import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity?: number; // Add optional quantity property
}
// Product Slice
export const fetchProducts = createAsyncThunk("products/fetch", async (currentPage: number) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}`
  );
  const data = await response.json();
  return data.products;
});

const initialState: {
  items: Product[];
  isLoading: boolean;
  currentPage: number;
} = {
  items: [],
  isLoading: false,
  currentPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;