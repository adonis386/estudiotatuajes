// Temporary authentication until Firebase implementation
export const tempUser = {
  email: 'admin@denis.com',
  password: 'admin123'
}

export const checkAuth = (email: string, password: string): boolean => {
  return email === tempUser.email && password === tempUser.password
}

// Temporary session management
export const setTempSession = () => {
  sessionStorage.setItem('isAuthenticated', 'true')
}

export const clearTempSession = () => {
  sessionStorage.removeItem('isAuthenticated')
}

export const isAuthenticated = (): boolean => {
  return sessionStorage.getItem('isAuthenticated') === 'true'
}
