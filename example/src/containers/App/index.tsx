import React, { useState } from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from '../../logo.svg'
import styles from './index.module.css'

import InfoBar from '../../components/InfoBar'
import MenuSettings from '../../components/MenuSettings'
import ResponseBoard from '../../components/ResponseBoard'

const App = () => {

  const [reset, setReset] = useState(false)
  const [method, setMethod] = useState('POST')
  const [endpoint, setEndpoint] = useState(
    'https://jsonplaceholder.typicode.com/posts/1'
  )

  const { isLoading, isSuccess, hasError, rspData, fetchData } = useAxiosHook(
    reset ? 3000 : 0
  )

  const handleMethod = (e: string) => setMethod(e)
  const handleEndpoint = (e: string) => setEndpoint(e)
  const handleReset = (e: boolean) => setReset(e)

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
            onClick={() => fetchData(endpoint, method, {
              title: 'New Post',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia asperiores mollitia ipsam aliquam dolore, similique et enim error non iste illo inventore voluptate debitis. Ut vero eligendi ducimus et mollitia!',
              userId: 1
            })}
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
