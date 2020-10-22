import React from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

const AuthPage = () => {

   const auth = React.useContext(AuthContext)
   const message = useMessage()
   const {
      loading,
      error,
      request,
      clearError,
   } = useHttp()
   const [form, setForm] = React.useState({
      email: '',
      password: '',
   })

   React.useEffect(() => {
      message(error)
      clearError()
   }, [error, message, clearError])

   const changeHandler = e => {
      setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
         }),
      )
   }

   const registerHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', {...form})
         message(data.message)
      } catch (error) {
      }
   }

   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', {...form})
         auth.login(data.token, data.userID)
      } catch (error) {
      }
   }

   return (
      <div className="row auth-page">
         <div className="col s6 offset-s3">
            <h1 className="center">Small link</h1>

            <div className="card white darken-1">
               <div className="card-content black-text">
                  <span className="card-title">Authorization</span>
                  <div>

                     <div className="input-field">
                        <input id="email"
                               name="email"
                               type="text"
                               className="validate"
                               value={form.email}
                               onChange={changeHandler}
                        />
                        <label htmlFor="email">Email</label>
                     </div>

                     <div className="input-field">
                        <input id="password"
                               name="password"
                               type="password"
                               className="validate"
                               value={form.password}
                               onChange={changeHandler}
                        />
                        <label htmlFor="password">Password</label>
                     </div>

                  </div>
               </div>
               <div className="card-action">

                  <button className="btn blue darken-3"
                          onClick={loginHandler}
                          disabled={loading}>Sign in
                  </button>

                  <button className="btn blue darken-3"
                          onClick={registerHandler}
                          disabled={loading}>Registration
                  </button>

               </div>
            </div>

         </div>
      </div>
   )
}

export default React.memo(AuthPage)
