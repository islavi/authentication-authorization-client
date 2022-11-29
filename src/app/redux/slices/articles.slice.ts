import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ArticleState {
  email: string
  name: string
}

const initialState: ArticleState = {
  email: '',
  name: '',
}

export const articlesSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setArticles(state: ArticleState, { payload }: PayloadAction<ArticleState>) {
      state.email = payload.email
      state.name = payload.name
    },
  },
})

export const { setArticles } = articlesSlice.actions
export const articlesReducer = articlesSlice.reducer
