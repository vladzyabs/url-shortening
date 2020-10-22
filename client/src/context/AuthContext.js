import React from 'react'

function noop() {
}

export const AuthContext = React.createContext({
   token: null,
   userID: null,
   login: noop,
   logout: noop,
   isAuth: false,
})
