import React, { useState } from 'react'
import useAxiosHook from 'axios-hook-library'

import logo from '../../logo.svg';
import styles from './index.module.css';

import RadioInput from "../../components/RadioInput"

const App = () => {
  const [settings, setSettings] = useState(false);
  const [method, setMethod] = useState('POST');
  const [endpoint, setEndpoint] = useState('https://randomuser.me/api');
  const { isLoading, isSent, hasError, rspData, fetchData } = useAxiosHook();

  const handleMethod = (e: string) => setMethod(e);
  const handleEndpoint = (e: string) => setEndpoint(e);

  return (
    <main>
      <button className={styles.menuCog} onClick={() => setSettings(!settings)}>COG</button>
      <div className={`${styles.menuSettings} ${settings && styles['menuSettings--on']}`}>
        <div className={styles.painel}>
          <RadioInput changeMethod={handleMethod} changeEndpoint={handleEndpoint} data={{ endpoint, method }} />
        </div>
        <div onClick={() => setSettings(false)} className={styles.bgSettings} />
      </div>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
        </header>
        <div className={styles.appBody}>
          <button
            className={styles.appButton}
            onClick={() => fetchData('endpoint', method)}
            type="button"
          >
            Fetch Data
        </button>
          <div className={styles.appInfos}>
            Method: <b>{`${method}`}</b>
          Sent: <b style={{ color: isSent ? '#addb67' : '#ffa7c4' }}>{`${isSent}`}</b>
          Loading: <b style={{ color: isLoading ? '#addb67' : '#ffa7c4' }}>{`${isLoading}`}</b>
          Error: <b style={{ color: hasError ? '#ffa7c4' : '#addb67' }}>{`${hasError}`}</b>
          </div>
          <div>
            Endpoint: {endpoint}
          </div>
          <pre className={styles.appResponse}>
            <code>
              {rspData ? JSON.stringify(rspData, null, 2) : <p>Data fetched will be showed here</p>}
            </code>
          </pre>
        </div>
      </div >
    </main>
  );
}

export default App
