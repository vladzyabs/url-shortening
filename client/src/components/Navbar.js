import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {PATHS} from '../routes'
import {AuthContext} from '../context/AuthContext'

const Navbar = () => {

   const history = useHistory()
   const auth = React.useContext(AuthContext)

   const logoutHandler = e => {
      e.preventDefault()
      auth.logout()
      history.push(PATHS.HOME)
   }

   return (
      <nav className="navbar">
         <div className="nav-wrapper blue darken-1">
            <span className="brand-logo">Small links</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li><NavLink to={PATHS.CREATE}>Create</NavLink></li>
               <li><NavLink to={PATHS.LINKS}>Links</NavLink></li>
               <li><a href={'/'}
                      onClick={logoutHandler}
                      className="waves-effect waves-light btn blue darken-2"
               >Logout</a></li>
            </ul>
         </div>
      </nav>
   )
}

export default React.memo(Navbar)
