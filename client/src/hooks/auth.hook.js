import React from 'react'

const storageName = 'userData'

export const useAuth = () => {
   const [token, setToken] = React.useState(null)
   const [ready, setReady] = React.useState(false)
   const [userID, setUserID] = React.useState(null)

   const login = React.useCallback(
      (jwtToken, id) => {
         setToken(jwtToken)
         setUserID(id)

         localStorage.setItem(storageName, JSON.stringify({
            userID: id,
            token: jwtToken,
         }))
      },
      [])

   const logout = React.useCallback(
      () => {
         setToken(null)
         setUserID(null)

         localStorage.removeItem(storageName)
      },
      [])

   React.useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName))
      if (data && data.token) {
         login(data.token, data.userID)
      }
      setReady(true)
   }, [login])

   return {login, logout, token, userID, ready}
}
