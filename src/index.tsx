import * as React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

/**
* Creation of react states to identify errors, success and loading. 
* Creation of the function that sends/get requests to endpoint.
* @param {Number=} resetInterval Time in milliseconds to reset "isSuccess" state (optional)
* @return {boolean} isLoading: The load state
* @return {boolean} isSuccess: The success state
* @return {boolean} hasError: The error state
* @return {object} rspData: The response data
* @return {function()} fetchData: The request function
*/

const useAxiosHook = (resetInterval?: number) => {
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [hasError, setHasError] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [rspData, setRspData] = React.useState<object>({})

  React.useEffect(() => {
    let timeout: any

    if (isSuccess && resetInterval) {
      timeout = setTimeout(() => setIsSuccess(false), resetInterval)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isSuccess, resetInterval])

  /**
  * Setting isLoading to true / Resetting hasError and isSuccess to false
  * @return {void} no return
  */

  const handleReset = (): void => {
    setIsLoading(true)
    setIsSuccess(false)
    setHasError(false)
  }

  /**
  * Setting isSuccess to true and store error in rspData state.
  * @param {Any} e The request response
  * @return {void} no return
  */

  const handleResponse = (e: any): void => {
    setIsSuccess(true)
    setRspData(e)
  }

  /**
  * Setting hasError to true and store error in rspData state.
  * @param {Any} e The request response
  * @return {Void} no return
  */

  const handleError = (e: any): void => {
    setHasError(true)
    setRspData(e)
  }

  /**
  * Setting isLoading to false
  * @return {Void} no return
  */

  const handleLoad = () => setIsLoading(false)

  /**
  * Creating the union type Method Fetch to use on fetchData function as method Type
  */
  type MethodsFetch = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

  /**
  * Function to request or send data 
  * @param {String} baseURL The endpoint URL
  * @param {MethodsFetch} method The request method
  * @param {Object=} data The data to pass to request (optional)
  * @param {Object=} headers The headers of request (optional)
  * @return {Object} The result of the Axios Request
  */

  const fetchData = (
    baseURL: string,
    method: MethodsFetch,
    data?: object,
    headers?: object,
  ) => {
    handleReset()
    return axios.request({
      method,
      baseURL,
      data,
      headers
    })
      .then((response: AxiosResponse): void => handleResponse(response))
      .catch((error: AxiosError): void => handleError(error))
      .finally((): void => handleLoad())
  }

  // Return HOOK data
  return { isLoading, isSuccess, hasError, rspData, fetchData }
}

export default useAxiosHook
