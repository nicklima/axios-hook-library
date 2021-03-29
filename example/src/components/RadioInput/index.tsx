import React from 'react'
import styles from './index.module.css'

const RadioInput = ({ changeMethod, data }: any) => {
  console.log(changeMethod, data)
  const methods = ['POST', 'GET', 'PUT']
  const { endpoint, method } = data
  return (
    <div>
      <input type="url" placeholder="Endpoint" value={endpoint} />
      {methods.map((item: string, idx: number) => {
        return (
          <label key={`methods_${idx}`} className={styles.checkOptions} onClick={() => changeMethod(item)}>
            <span>{item}</span>
            <input type="checkbox" checked={item === method && true} />
            <span className={styles.checkmark} />
          </label>
        )
      })}
    </div>
  )
}

export default RadioInput