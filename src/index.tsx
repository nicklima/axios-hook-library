import * as React from 'react'
import axios from 'axios'

const useAxiosHook = (resetInterval?: number) => {
  const [isSent, setIsSent] = React.useState<boolean>(false)
  const [hasError, setHasError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [rspData, setRspData] = React.useState<object>({})

  const handleResponse = (e: any) => {
    setRspData(e)
    setIsSent(true)
  }

  const handleError = (e: any) => {
    setRspData(e)
    setIsSent(false)
    setHasError(true)
  }

  const handleLoad = () => setIsLoading(false)

  const fetchData = (
    endpoint: string,
    method: any = 'POST',
    data: object = {},
    headers: object = {}
  ) => {
    setIsLoading(true)
    return axios({
      method,
      baseURL: endpoint,
      headers,
      data
    })
      .then((response) => handleResponse(response.data))
      .catch((error) => error && handleError(error.response))
      .finally(() => handleLoad())
  }

  React.useEffect(() => {
    let timeout: any
    if (isSent && resetInterval) {
      timeout = setTimeout(() => setIsSent(false), resetInterval)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isSent, resetInterval])

  return { isLoading, isSent, hasError, rspData, fetchData }
}

export default useAxiosHook
