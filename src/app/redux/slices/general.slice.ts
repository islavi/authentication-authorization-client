import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface GeneralState {
  showLoader: boolean
}

const initialState: GeneralState = {
  showLoader: false,
}

export const generalSlice = createSlice({
  name: 'generalSlice',
  initialState,
  reducers: {
    setShowLoader(state: GeneralState, { payload }: PayloadAction<boolean>) {
      state.showLoader = payload
    },
  },
})

export const { setShowLoader } = generalSlice.actions
export const generalReducer = generalSlice.reducer
export const selectGeneral = (state: RootState) => state.generalReducer
