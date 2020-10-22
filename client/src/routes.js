import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LinksPage from './pages/LinksPage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import AuthPage from './pages/AuthPage'

export const PATHS = {
   HOME: '/',
   LINKS: '/links',
   CREATE: '/create',
   DETAIL: '/detail/:id'
}

export const useRoutes = isAuth => {
   if (isAuth) {
      return (
         <Switch>
            <Route exact path={PATHS.LINKS}><LinksPage/></Route>
            <Route exact path={PATHS.CREATE}><CreatePage/></Route>
            <Route path={PATHS.DETAIL}><DetailPage/></Route>
            <Redirect to={PATHS.CREATE}/>
         </Switch>
      )
   }
   return (
      <Switch>
         <Route exact path={PATHS.HOME}><AuthPage/></Route>
         <Redirect to={PATHS.HOME}/>
      </Switch>
   )
}
