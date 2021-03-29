import React from 'react'
import styles from './index.module.css'

const RadioInput = ({ setReset, changeMethod, changeEndpoint, data }: any) => {
  const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']
  const { endpoint, method, reset } = data
  return (
    <div>
      <input
        className={styles.inputUrl}
        type='url'
        placeholder='Endpoint'
        value={endpoint}
        onChange={(e) => changeEndpoint(e.target.value)}
      />
      <div className={styles.inputMethods}>
        {methods.map((item: string, idx: number) => {
          return (
            <label
              key={`methods_${idx}`}
              className={styles.inputCheckOptions}
              onClick={() => changeMethod(item)}
            >
              <span>{item}</span>
              <input type='checkbox' checked={item === method && true} />
              <span className={styles.inputCheckMark} />
            </label>
          )
        })}
      </div>
      <div className={styles.inputMethods}>
        <label
          className={styles.inputCheckOptions}
          onClick={() => setReset(!reset)}
        >
          <span>Resetar isSent</span>
          <input type='checkbox' />
          <span className={styles.inputCheckMark} />
        </label>
      </div>
    </div>
  )
}

export default RadioInput
