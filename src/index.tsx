import * as React from 'react'
import axios from 'axios'

const useAxiosHook = (resetInterval?: number) => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [hasError, setHasError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [rspData, setRspData] = React.useState<object>({})

  const handleReset = (): void => {
    setIsLoading(true)
    setIsSuccess(false)
    setHasError(false)
  }

  const handleResponse = (e: any) => {
    setRspData(e)
    setIsSuccess(true)
  }

  const handleError = (e: any) => {
    setRspData(e)
    setIsSuccess(false)
    setHasError(true)
  }

  const handleLoad = () => setIsLoading(false)

  const fetchData = (
    endpoint: string,
    method: any = 'POST',
    data: object = {},
    headers: HeadersInit = {},
  ) => {
    handleReset()
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
    if (isSuccess && resetInterval) {
      timeout = setTimeout(() => setIsSuccess(false), resetInterval)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isSuccess, resetInterval])

  return { isLoading, isSuccess, hasError, rspData, fetchData }
}

export default useAxiosHook
