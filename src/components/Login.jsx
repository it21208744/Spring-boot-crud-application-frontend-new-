import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { tokenLogin, LoginApi } from '../Apis/authApi'
import Wrapper from '../assets/Wrappers/Login'
import { isRefreshExpired } from '../utils/ExpireTime'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const findRefreshToken = async () => {
    try {
      const tokenValidation = await tokenLogin()

      if (tokenValidation != null && tokenValidation.ok) {
        if (tokenValidation.headers.get('roles') === 'Admin') {
          navigate('/dash/admin')
        } else {
          navigate('/dash')
        }
      }
    } catch (error) {
      console.log('Error validating token:', error)
    }
  }

  useEffect(() => {
    if (!isRefreshExpired()) {
      findRefreshToken()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    const loginData = {
      email: email,
      password: password,
    }

    try {
      const response = await LoginApi(loginData)

      if (response.ok) {
        localStorage.setItem(
          'accessToken',
          response.headers.get('Authorization')
        )
        localStorage.setItem(
          'refreshToken',
          response.headers.get('Refresh-Token')
        )
        if (response.headers.get('roles') === 'Admin') {
          navigate('/dash/admin')
        } else if (response.headers.get('roles') === 'User') {
          navigate('/dash')
        } else {
          setErrorMessage('Not a valid user')
        }
      } else {
        if (response.status === 401) {
          setErrorMessage('Incorrect password')
        } else if (response.status === 404) {
          setErrorMessage('User not found')
        } else {
          setErrorMessage('Something went wrong')
        }
      }
    } catch (error) {
      console.log('Error during login:', error)
      setErrorMessage('Something went wrong, please try again later')
    }
  }

  return (
    <Wrapper>
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Login
          </button>
          <a className="register-link" onClick={() => navigate('register')}>
            Don't have an account?
          </a>
        </div>
      </form>
    </Wrapper>
  )
}

export default Login
