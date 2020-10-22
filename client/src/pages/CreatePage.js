import React from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

const CreatePage = () => {

   const history = useHistory()
   const auth = React.useContext(AuthContext)
   const {request} = useHttp()
   const [link, setLink] = React.useState('')

   const linkHandler = e => setLink(e.target.value)

   const pressEnterHandler = async e => {
      if (e.key === 'Enter') {
         try {
            const data = await request(
               '/api/links/generate',
               'POST',
               {from: link},
               {Authorization: `Bearer ${auth.token}`},
            )
            history.push(`/detail/${data.link._id}`)
         } catch (error) {
         }
      }
   }

   return (
      <div className="row create-page">
         <div className="col s8 offset-s2">
            <h1 className="center">Create link</h1>

            <div className="input-field">
               <input id="link"
                      name="link"
                      type="text"
                      className="validate"
                      value={link}
                      onChange={linkHandler}
                      onKeyPress={pressEnterHandler}
               />
               <label htmlFor="link">Link</label>
            </div>

         </div>
      </div>
   )
}

export default React.memo(CreatePage)
