import React from 'react'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import 'materialize-css'

const App = () => {

   const {
      userID,
      token,
      login,
      logout,
      ready,
   } = useAuth()
   const isAuth = !!token
   const routes = useRoutes(isAuth)

   if (!ready) {
      return <Loader/>
   }

   return (
      <AuthContext.Provider value={{token, userID, login, logout, isAuth}}>
         {isAuth && <Navbar/>}
         <div className="container">
            {routes}
         </div>
      </AuthContext.Provider>
   )
}

export default App
