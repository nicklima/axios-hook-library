import React from 'react'

import styles from './index.module.css'

const InfoBar = ({ method, endpoint, reset, isLoading, isSent, hasError }: any) => {
    return (
        <>
            <div className={styles.appInfos}>
                Method: <b>{`${method}`}</b>
            Sent:{' '}
                <b
                    style={{ color: isSent ? '#addb67' : '#ffa7c4' }}
                >{`${isSent}`}
                </b>
            Reset:{' '}
                <b
                    style={{ color: reset ? '#addb67' : '#ffa7c4' }}
                >{`${reset}`}
                </b>
            Loading:{' '}
                <b
                    style={{ color: isLoading ? '#addb67' : '#ffa7c4' }}
                >{`${isLoading}`}</b>
            Error:{' '}
                <b
                    style={{ color: hasError ? '#ffa7c4' : '#addb67' }}
                >{`${hasError}`}</b>
            </div>
            <div className={styles.appEndpoint}><b>Endpoint:</b>{endpoint}</div>
        </>
    )
}

export default InfoBar