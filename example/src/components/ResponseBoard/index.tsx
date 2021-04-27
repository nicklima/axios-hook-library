import React from 'react'
import styles from './index.module.css'

const ResponseBoard = ({ data }: any) => {
  return (
    <pre className={styles.appResponse}>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  )
}

export default ResponseBoard
