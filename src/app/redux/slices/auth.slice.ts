import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AuthState {
  name: string
  email: string
  access_token: string
}

const initialState: AuthState = {
  name: '',
  email: '',
  access_token: '',
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthenticatedUser: (state: AuthState, { payload }: PayloadAction<AuthState>) => {
      console.log('authSlice:: setAuthenticatedUser: ', payload)
      state.name = payload.name
      state.email = payload.email
      state.access_token = payload.access_token
    },
    resetState: (state: AuthState) => {
      state.access_token = ''
      state.name = ''
      state.email = ''
      localStorage.setItem('user', '')
    },
  },
})

export const { setAuthenticatedUser, resetState } = authSlice.actions
export const authReducer = authSlice.reducer
export const selectAuthenticatedUser = (state: RootState) => state.authReducer
