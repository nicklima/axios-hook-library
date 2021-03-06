import React from 'react'
import styles from './index.module.css'

const RadioInput = ({ setReset, changeMethod, changeEndpoint, data }: any) => {
  const { endpoint, method, reset } = data
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  return (
    <div>
      <div
        className={[styles.inputMethods, styles['inputMethods--slider']].join(
          ' '
        )}
      >
        <label className={styles.inputSwitch}>
          <input type='checkbox' onChange={() => setReset(!reset)} />
          <span className={styles.inputSlider}></span>
        </label>
        <span>Reset Sent State</span>
      </div>
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
            <label key={`methods_${idx}`} className={styles.inputCheckOptions}>
              <span>{item}</span>
              <input
                type='checkbox'
                onChange={() => changeMethod(item)}
                checked={item === method && true}
              />
              <span className={styles.inputCheckMark} />
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default RadioInput
