import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import * as yup from 'yup'
import { Formik } from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css'
import './loginPage.css'
import { NotificationManager } from 'react-notifications'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { setAuthenticatedUser } from '../../redux/slices/auth.slice'
import { Card } from 'react-bootstrap'
import { useLoginMutation } from '../../services/auth.service'
import { setShowLoader } from '../../redux/slices/general.slice'

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
})

const LoginPage = () => {
  const [login, { data, error, isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (data && !error) {
      console.log('LoginPage:: data:', data)
      NotificationManager.success(`Welcome ${data.name}`, 'Authentication Success')
      localStorage.setItem('user', JSON.stringify(data))
      dispatch(setAuthenticatedUser(data))
      navigate('/home')
    } else if (error) {
      NotificationManager.error('Error authenticating user, please check your email and password', 'Authentication Error')
      console.log(`LoginPage:: Authentication error`, error)
    }
  }, [data, error, dispatch, navigate])

  useEffect(() => {
    dispatch(setShowLoader(isLoading))
  }, [isLoading, dispatch])

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue
    login({ email, password })
  }

  return (
    <div className="login-wrapper">
      <Formik
        validationSchema={schema}
        onSubmit={handleLogin}
        initialValues={{
          email: '',
          password: '',
          terms: false,
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
          <Card className="card" style={{ width: '18rem' }}>
            <Card.Title className="title">Login Page</Card.Title>
            <Form className="form" noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="validationFormikEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Your email address"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationFormik02">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">&#128273;</InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                  id="validationFormik0"
                />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
          </Card>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
