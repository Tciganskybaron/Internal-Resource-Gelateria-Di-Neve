import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



const getCategories = (recipes) => {
  const categories = { title:[], market_price:[], cost_price:[]};
  recipes.forEach((recipe) => {
      categories.title.push(recipe.title);
      categories.market_price.push(recipe.market_price);
      categories.cost_price.push(recipe.cost_price);
  });

  return categories;  // записывает в action.payload
};

export const loadMarketPrice = createAsyncThunk(
  'technolog/loadMarketPrice',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      console.log("привет");
      const response = await fetch('/technolog', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      // dispatch(marketPriceComplete({data}))

      return data; // записывает в action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const bossSlice = createSlice({
  name: 'technolog',
  initialState: {
    marketPrice: [], // Отчет по рыночной цене и себестоимости
 
  },
  reducers: {

  },

  extraReducers: {
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loadMarketPrice.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.marketPrice = getCategories(action.payload.collectResult);
      // state.marketPriceByBases = getCategories(action.payload.collectResult);
    },
    [loadMarketPrice.rejected]: setError,
    [loadMarketPrice.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

  },
});

const { changeMarketPriceComplete, changeStandartStoreComplete } = bossSlice.actions;

export default bossSlice.reducer;