import axios from 'axios'
import { setRefreshExpireTime, setAccessExpireTime } from '../utils/ExpireTime'
export const tokenLogin = async () => {
  try {
    const storedToken = localStorage.getItem('refreshToken')
    if (storedToken != '') {
      const response = await fetch('http://localhost:8080/users/tokenLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: storedToken,
        },
      })

      if (response.ok) {
        localStorage.setItem(
          'accessToken',
          response.headers.get('Authorization')
        )
        setAccessExpireTime()
        return response
      }
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

export const LoginApi = async (loginData) => {
  try {
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    setRefreshExpireTime()
    setAccessExpireTime()
    return response
  } catch (error) {
    // console.error('Error logging in:', error)
  }
}

export const registerUserApi = async (registerData) => {
  try {
    const response = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
    return response
  } catch (error) {
    // console.error('Error logging in:', error)
  }
}

export const logout = async () => {
  const authToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  if (authToken != '' && refreshToken != '') {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/logout`,
        {},
        {
          headers: {
            Authorization: authToken,
          },
        }
      )

      console.log('test')

      if (response.status == 200) {
        localStorage.setItem('accessToken', '')
        localStorage.setItem('refreshToken', '')
      }
      return response
    } catch (error) {
      console.error('Error during logout:', error)

      return null
    }
  } else {
    return null
  }
}
