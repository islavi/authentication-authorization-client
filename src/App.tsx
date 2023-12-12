import { Provider } from 'react-redux'
import RootNavigation from './app/navigation/RootNavigation'
import { store } from './app/redux/store'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import Loader from './app/components/Loader'
import { useAppDispatch, useAppSelector } from './app/redux/hooks'
import { selectGeneral } from './app/redux/slices/general.slice'
import { useEffect, useState } from 'react'
import { setAuthenticatedUser } from './app/redux/slices/auth.slice'
import NavigationBar from './app/components/NavigationBar/NavigationBar'

function App() {
  const general = useAppSelector(selectGeneral)
  const dispatch = useAppDispatch()
  const [finsihedInitialize, setFinsihedInitialize] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userFromStorage = JSON.parse(user)
      console.log('userFromStorage', userFromStorage)
      dispatch(setAuthenticatedUser(userFromStorage))
    }
    setFinsihedInitialize(true)
  }, [dispatch])

  return (
    <div className="App">
      {finsihedInitialize ? (
        <Provider store={store}>
          <NotificationContainer />
          <Loader show={general.showLoader} />
          <NavigationBar />
          <RootNavigation />
        </Provider>
      ) : (
        <></>
      )}
    </div>
  )
}

export default App
