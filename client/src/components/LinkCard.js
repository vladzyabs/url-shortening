import React from 'react'

const LinkCard = ({link}) => {
   return (
      <>
         <h2>Link</h2>
         <p>Your link: <br/>
            <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
         </p>
         <p style={{overflowX: 'auto'}}>From where: <br/>
            <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
         </p>
         <p>Click-through counter: <strong>{link.clicks}</strong></p>
         <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      </>
   )
}

export default React.memo(LinkCard)
