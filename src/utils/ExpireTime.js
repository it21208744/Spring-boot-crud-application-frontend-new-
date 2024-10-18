export const setRefreshExpireTime = () => {
  const currentTime = new Date().getTime()

  const expireTime = currentTime + 5 * 60 * 1000

  localStorage.setItem('RefreshExpireTime', expireTime.toString())
}

export const isRefreshExpired = () => {
  const expireTime = localStorage.getItem('RefreshExpireTime')
  if (expireTime) {
    const currentTime = new Date().getTime()

    if (currentTime > parseInt(expireTime, 10)) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

export const setAccessExpireTime = () => {
  const currentTime = new Date().getTime()

  const expireTime = currentTime + 1 * 60 * 1000

  localStorage.setItem('AccessExpireTime', expireTime.toString())
}

export const isAccessExpired = () => {
  const expireTime = localStorage.getItem('AccessExpireTime')
  if (expireTime) {
    const currentTime = new Date().getTime()

    if (currentTime > parseInt(expireTime, 10)) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}
