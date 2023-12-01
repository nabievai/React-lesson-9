import React from "react";
import styles from './styles.module.scss'
import clsx from "clsx";
import { createRoutesFromElements } from "react-router-dom";

const SwapIcon = ({onClick}) => {
    return(
        <div className={styles['icon-arrows']} onClick={onClick}>
          <i className={styles['icon-arrows']}></i>
        </div>
    )
}

export default SwapIcon;