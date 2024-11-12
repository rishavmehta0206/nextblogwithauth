import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
            Logo
        </div>
        <div className={styles.text}>
            Lorem ipsum dolor sit amet © All rights reserved.
        </div>
    </div>
  )
}

export default Footer