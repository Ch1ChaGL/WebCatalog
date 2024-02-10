import { AsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from '@/utils/local-storage';

interface ISearchInitialState {
  page: number;
  limit: number;
  query?: string;
}
export const initialState: ISearchInitialState = {
  page: 1,
  limit: 5,
  query: '',
};

export const searhSlice = createSlice({
  name: 'searh',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setPage, setLimit, setQuery } = searhSlice.actions;
