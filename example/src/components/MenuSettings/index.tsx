import React, { useState } from 'react'

import styles from "./index.module.css"
import RadioInput from '../RadioInput'

const MenuSettings = ({ handleMethod, handleEndpoint, handleReset, data }: any) => {
    const [settings, setSettings] = useState(false)
    return (
        <>
            <button
                aria-label='Abrir Menu Lateral'
                className={styles.menuCog}
                onClick={() => setSettings(!settings)}
            >
                <div className={`${styles.holder} ${settings ? styles['open'] : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div
                className={`${styles.menuSettings} ${settings && styles['menuSettings--on']
                    }`}
            >
                <div className={styles.painel}>
                    <div className='container'>
                        <RadioInput
                            setReset={handleReset}
                            changeMethod={handleMethod}
                            changeEndpoint={handleEndpoint}
                            data={data}
                        />
                    </div>
                </div>
                <div onClick={() => setSettings(false)} className={styles.bgSettings} />
            </div>
        </>
    )
}

export default MenuSettings