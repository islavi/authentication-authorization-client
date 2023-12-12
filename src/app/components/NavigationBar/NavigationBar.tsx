import './navigation-bar.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetState, selectAuthenticatedUser } from '../../redux/slices/auth.slice'

const NavigationBar = () => {
  const dispatch = useAppDispatch()
  const { name, access_token } = useAppSelector(selectAuthenticatedUser)

  const logout = () => {
    dispatch(resetState())
    window.location.href = '/'
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Client Example</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-wrapper">
            <div className="nav-left">
              <Nav.Link href="/home">Home</Nav.Link>
              {access_token ? <Nav.Link href="/my">My Articles</Nav.Link> : <Outlet />}
            </div>
            <div className="nav-right">
              {access_token ? (
                <NavDropdown title={name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/about">About</NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title={'UnAuthenticted'} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/about">About</NavDropdown.Item>
                  <NavDropdown.Item href="/">Login</NavDropdown.Item>
                </NavDropdown>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
