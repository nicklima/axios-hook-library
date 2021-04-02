import * as React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

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

  const handleResponse = (e: any): void => {
    setRspData(e)
    setIsSuccess(true)
  }

  const handleError = (e: any): void => {
    setRspData(e)
    setIsSuccess(false)
    setHasError(true)
  }

  const handleLoad = () => setIsLoading(false)

  const fetchData = (
    baseURL: string,
    method: any = 'POST',
    data: object = {},
    headers: HeadersInit = {},
    responseType: any = 'json',
  ) => {
    handleReset()

    return axios.request({
      method,
      baseURL,
      headers,
      data,
      responseType
    })
      .then((response: AxiosResponse): void => handleResponse(response.data))
      .catch((error: AxiosError): void => error && handleError(error.toJSON()))
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
