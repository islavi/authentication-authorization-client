import { Middleware } from '@reduxjs/toolkit'

const unauthenticatedMiddleware: Middleware = (api) => (next) => async (action: any) => {
  const response = next(action)

  if (action?.payload?.status) {
    window.location.href = '/login'
  }

  return response
}

export default unauthenticatedMiddleware
