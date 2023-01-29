import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
    fullName: '',
    companyId: '',
    companyName: '',
    language: '',
    currency: '',
  },
  reducers: {
    initSession: (state: any, action: { payload: UserState }) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.companyId = action.payload.companyId;
      state.companyName = action.payload.companyName;
      state.language = action.payload.language;
      state.currency = action.payload.currency;
    },
    updateSession: (state: any, action: { payload: UpdatableUserStateInfos }) => {
      state.fullName = action.payload.fullName || state.fullName;
      state.companyName = action.payload.companyName || state.companyName;
      state.currency = action.payload.currency || state.currency;
    },
    endSession: (state) => {
      state.id = '';
      state.email = '';
      state.fullName = '';
      state.companyId = '';
      state.companyName = '';
      state.language = '';
      state.currency = '';
    },
  },
});

export interface UserState {
  id: number,
  email: string,
  fullName: string,
  companyId: number,
  companyName: string,
  language: string,
  currency: 'USD' | 'EUR',
}

export interface UpdatableUserStateInfos {
  fullName?: string,
  companyName?: string,
  currency?: 'USD' | 'EUR',
}

// Action creators are generated for each case reducer function
export const { initSession, updateSession, endSession } = user.actions;
const userReducer = user.reducer;

export default userReducer;
