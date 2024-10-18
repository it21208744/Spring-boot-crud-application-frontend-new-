import axios from 'axios'
import { tokenLogin } from './authApi'
import { isRefreshExpired, isAccessExpired } from '../utils/ExpireTime'

export const viewAllUsersApi = async () => {
  const authToken = localStorage.getItem('accessToken')

  try {
    if (!isRefreshExpired()) {
      console.log('test1')
      if (!isAccessExpired()) {
        console.log('test2')
        const response = await axios.get('http://localhost:8080/users', {
          headers: {
            Authorization: authToken,
          },
        })
        return response.data
      } else {
        console.log('test3')
        await tokenLogin()

        const response = await axios.get('http://localhost:8080/users', {
          headers: {
            Authorization: authToken,
          },
        })
        return response
      }
    } else {
      return null
    }
  } catch (error) {
    console.log('test4')
    console.log(error)
  }
}

export const deleteUser = async (id) => {
  const authToken = localStorage.getItem('accessToken')

  try {
    if (!isRefreshExpired()) {
      if (!isAccessExpired()) {
        const response = await axios.delete(
          `http://localhost:8080/users/${id}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
        return response
      } else {
        await tokenLogin()

        const newAuthToken = localStorage.getItem('accessToken') // Get the new token after re-login
        const response = await axios.delete(
          `http://localhost:8080/users/${id}`,
          {
            headers: {
              Authorization: newAuthToken,
            },
          }
        )
        return response
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

export const handleUpdate = async (id, firstName, lastName) => {
  const authToken = localStorage.getItem('accessToken')

  try {
    if (!isRefreshExpired()) {
      if (!isAccessExpired()) {
        const response = await axios.put(
          `http://localhost:8080/users/${id}`,
          {
            firstName: firstName,
            lastName: lastName,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: authToken,
              'Custom-Header': 'custom-value',
            },
          }
        )
        return response
      } else {
        await tokenLogin()

        const newAuthToken = localStorage.getItem('accessToken') // Get the new token after re-login
        const response = await axios.put(
          `http://localhost:8080/users/${id}`,
          {
            firstName: firstName,
            lastName: lastName,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: newAuthToken,
              'Custom-Header': 'custom-value',
            },
          }
        )
        return response
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
