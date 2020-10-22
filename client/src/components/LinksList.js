import React from 'react'
import {Link} from 'react-router-dom'

const LinksList = ({links}) => {

   if (!links.length) {
      return <h2 className="center">No links</h2>
   }

   return (
      <table class="highlight responsive-table">
         <thead>
         <tr>
            <th style={{padding: '3px 10px'}}>№</th>
            <th style={{padding: '3px 10px'}}>Original</th>
            <th style={{padding: '3px 10px'}}>Abbreviated</th>
            <th style={{padding: '3px 10px'}}>Open</th>
         </tr>
         </thead>

         <tbody>
         {
            links.map((link, index) => {
               return (
                  <tr key={link._id}>
                     <td style={{padding: '3px 10px'}}>{index + 1}</td>
                     <td style={{overflowWrap: 'anywhere', padding: '3px 10px'}}>{link.from}</td>
                     <td style={{padding: '3px 10px'}}>{link.to}</td>
                     <td style={{padding: '3px 10px'}}><Link to={`/detail/${link._id}`}>Open</Link></td>
                  </tr>
               )
            })
         }
         </tbody>
      </table>
   )
}

export default React.memo(LinksList)
