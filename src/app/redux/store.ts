import { configureStore } from '@reduxjs/toolkit'
import { articlesAPI } from '../services/articles.service'
import { authAPI } from '../services/auth.service'
import { articlesReducer } from './slices/articles.slice'
import { authReducer } from './slices/auth.slice'
import { generalReducer } from './slices/general.slice'
import { userReducer } from './slices/user.slice'
import unauthenticatedMiddleware from '../middlewares/unauthenticatedMiddleware'

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    articlesReducer,
    generalReducer,

    [authAPI.reducerPath]: authAPI.reducer,
    [articlesAPI.reducerPath]: articlesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(unauthenticatedMiddleware).concat([authAPI.middleware]).concat([articlesAPI.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
