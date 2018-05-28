import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken(item) {
  if (item) {
    return Cookies.get(item)
  } else {
    return Cookies.get(TokenKey)
  }
}

export function setToken(token, item) {
  if (item) {
    return Cookies.set(item, token)
  } else {
    return Cookies.set(TokenKey, token)
  }

}

export function removeToken(item) {
  if (item) {
    return Cookies.remove(item)
  } else {
    return Cookies.remove(TokenKey)
  }
}
