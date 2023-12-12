import { BrowserRouter, Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import HomePage from '../pages/home/HomePage'
import MyArticlesPage from '../pages/myArticles/MyArticlesPage'
import AboutPage from '../pages/about/AboutPage'
import { useAppSelector } from '../redux/hooks'
import { selectAuthenticatedUser } from '../redux/slices/auth.slice'

const PrivateRoute = ({ ...rest }: RouteProps): React.ReactElement | null => {
  const { access_token } = useAppSelector(selectAuthenticatedUser)
  return access_token ? <Outlet /> : <Navigate to="/login" />
}

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/my" element={<PrivateRoute />}>
          <Route path="/my" element={<MyArticlesPage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RootNavigation
