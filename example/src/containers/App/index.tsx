import React, { useState } from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from '../../logo.svg'
import styles from './index.module.css'

import InfoBar from '../../components/InfoBar'
import MenuSettings from '../../components/MenuSettings'
import ResponseBoard from '../../components/ResponseBoard'

const App = () => {

  type Methods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  const [reset, setReset] = useState(false)
  const [method, setMethod] = useState<Methods>("GET")
  const [endpoint, setEndpoint] = useState(
    'https://jsonplaceholder.typicode.com/posts/1'
  )

  const { isLoading, isSuccess, hasError, rspData, fetchData } = useAxiosHook(
    reset ? 3000 : 0
  )

  const handleMethod = (e: Methods) => setMethod(e)
  const handleEndpoint = (e: string) => setEndpoint(e)
  const handleReset = (e: boolean) => setReset(e)

  const formData = {
    title: 'New Post',
    userId: 1
  }

  return (
    <main>
      <MenuSettings handleMethod={handleMethod} handleEndpoint={handleEndpoint} handleReset={handleReset} data={{ reset, method, endpoint }} />
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt='logo' />
        </header>
        <div className={styles.appBody}>
          <button
            className={styles.appButton}
            onClick={() => {
              method === 'GET' || method === 'DELETE' ? fetchData(endpoint, method) : fetchData(endpoint, method, formData)
            }}
            type='button'
          >
            Fetch Data
          </button>
          <InfoBar method={method} endpoint={endpoint} reset={reset} isLoading={isLoading} isSuccess={isSuccess} hasError={hasError} />
          <ResponseBoard data={rspData} />
        </div>
      </div>
    </main>
  )
}

export default App
