import React from "react";
import styles from './styles.module.scss'
import clsx from "clsx";
import { createRoutesFromElements } from "react-router-dom";

const Input = (props) => {
    const {
        value,
        type = 'text',
        onChange,
        label,
        disabled,
        className
    } = props

    const inputClasses = clsx(
        styles['input-wrap'],
        className,
        {
            [styles['input--disabled']]: disabled
        }
    )

    return(
        <div className={inputClasses}>
            {label && (
                <span className={styles['label']}>
                    {label}
                </span>
            )}
            <input 
            type={type}
            className={styles['input']}
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            disabled={disabled}
            ></input>
        </div>
    )
}

export default Input;