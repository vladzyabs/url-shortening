import React from 'react'

export const useHttp = () => {
   const [loading, setLoading] = React.useState(false)
   const [error, setError] = React.useState(null)

   const request = React.useCallback(
      async (url, method = 'GET', body = null, headers = {}) => {
         setLoading(true)
         try {
            if (body) {
               body = JSON.stringify(body)
               headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
               throw new Error(data.message || 'Oops, something went wrong')
            }

            setLoading(false)

            return data
         } catch (error) {
            setLoading(false)
            setError(error.message)
            throw error
         }
      },
      [],
   )

   const clearError = React.useCallback(() => setError(null), [])

   return {loading, request, error, clearError}
}
