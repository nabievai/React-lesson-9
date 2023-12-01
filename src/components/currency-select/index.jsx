import React from "react";
import Select from "react-select";
import styles from './styles.module.scss'
import clsx from "clsx";
import CurrencyFlag from "../currency-flag";
import { createRoutesFromElements } from "react-router-dom";

const CurrencySelect = (props) => {
    const {
        value,
        onChange,
        options,
        label,
        placeholder,
        disabled,
        className
    } = props

    const selectClassnames = clsx(
        styles['select-wrap'],
        className,
        {
            [styles['select--disabled']]: disabled
        }
    )

    const formatOptionLabel = ( option ) => {
        return (
            <div className={styles['custom-option']}>
            <CurrencyFlag currency={option.value}/>
            <div className={styles['label']}>{option.label}</div>
        </div>
        );
    }

    return(
        <div className={selectClassnames}>
            {label && (
                <span className={styles['label']}>
                    {label}
                </span>
            )}
            <Select  
            className={styles['select']}
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            isDisabled={disabled}
            formatOptionLabel={formatOptionLabel}
            options={options}/>
        </div>
    )
}

export default CurrencySelect;