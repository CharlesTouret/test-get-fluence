import { createSlice } from '@reduxjs/toolkit';

export const auth = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    type: '',
    accessToken: '',
  },
  reducers: {
    login: (state: any, action: any) => {
      state.loggedIn = true;
      state.type = action.payload.type;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.type = '';
      state.accessToken = '';
    },
  },
});

export interface AuthState {
  loggedIn: boolean,
  type: string,
  accessToken: string,
}

// Action creators are generated for each case reducer function
export const { login, logout } = auth.actions;
const authReducer = auth.reducer;

export default authReducer;
