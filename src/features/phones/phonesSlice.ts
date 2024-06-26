import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/product'
import { getAllProducts } from '../../api/productApi';

export interface PhonesState {
  loading: boolean;
  phones: Product[];
  error: string;
}

const initialState: PhonesState = {
  loading: false,
  phones: [],
  error: '',
};

export const phonesInit = createAsyncThunk('phones/fetch', () => {
  return getAllProducts<Product[]>();
})

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.phones = action.payload
    }
  },

  extraReducers: builder => {
    builder.addCase(phonesInit.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(phonesInit.fulfilled, (state, action) => {
      state.loading = false;
      state.phones = action.payload;
    })

    builder.addCase(phonesInit.rejected, state => {
      debugger
      state.loading = false;
      state.error = 'Something went wrong...'
    })
  }
});

export const productAction = phonesSlice.actions;

export default phonesSlice.reducer;