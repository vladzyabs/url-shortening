import React from 'react'

export const useMessage = () => {
   return React.useCallback(
      message => {
         if (window.M && message) {
            window.M.toast({html: message, classes: 'rounded'})
         }
      },
      [],
   )
}
