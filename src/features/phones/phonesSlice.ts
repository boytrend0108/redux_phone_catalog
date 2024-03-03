import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/product'
import { getAllProducts } from '../../api/productApi';

interface PhonesState {
  loading: boolean;
  phones: Product[];
  error: string;
}

const initialState: PhonesState = {
  loading: false,
  phones: [],
  error:'',
};

export const phonesInit = createAsyncThunk('phones/fetch', () => {
  return getAllProducts<Product[]>();
})

const phonesSlice = createSlice({
  name: 'phones', 
  initialState,
  reducers: {},
  
  extraReducers: builder => {
    builder.addCase(phonesInit.pending, state => {
      state.loading = true;
    });

    builder.addCase(phonesInit.fulfilled, (state, action) => {
      state.loading = false;
      state.phones = action.payload;
    })

    builder.addCase(phonesInit.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong...'
    })
  }

});

export default phonesSlice.reducer;