import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUsers',
  async ({login, password}, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/auth/log', {
        method: 'POST',
        body: JSON.stringify({
          login,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      // console.log(data, " Это данные с сервера");

      return data; // записывает в action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({role, fullname, login, password}, { rejectWithValue, dispatch }) => {
    try {
      console.log(role, 111111111111111111111111111);
      console.log(fullname);
      console.log(login);
      console.log(password);
      const response = await fetch('/auth/reg', {
        method: 'POST',
        body: JSON.stringify({
          role, 
          fullname,
          login,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Server Error!');
      }
      // const data = await response.json();
      // console.log(data, " Это данные с сервера с зарегистрированным юзером");

      //return data; // записывает в action.payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: [], //храним текущего юзера
    // registration: [],
    status: null,
    error: null,
  },

  extraReducers: {

    [loginUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.login = action.payload;
      console.log(state.login, "это стейт логин");
    },
    [loginUser.rejected]: setError,
    [loginUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
  },
});
export default authSlice.reducer;
