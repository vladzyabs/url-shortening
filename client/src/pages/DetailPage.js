import React from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import Loader from '../components/Loader'
import LinkCard from '../components/LinkCard'

const DetailPage = () => {

   const {token} = React.useContext(AuthContext)
   const {request, loading} = useHttp()
   const linkID = useParams().id
   const [link, setLink] = React.useState(null)

   const getLink = React.useCallback(
      async () => {
         try {
            const fetched = await request(
               `/api/links/${linkID}`,
               'GET',
               null,
               {Authorization: `Bearer ${token}`}
               )
            setLink(fetched)
         } catch (error) {
         }
      },
      [token, linkID, request],
   )

   React.useEffect(() => {
      getLink()
   }, [getLink])

   if (loading) {
      return <Loader/>
   }

   return (
      <>
         {!loading && link && <LinkCard link={link}/>}
      </>
   )
}

export default React.memo(DetailPage)
