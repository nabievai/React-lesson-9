import React from "react";
import flags from '../../consts/flags'

import styles from './styles.module.scss'
import styled from "styled-components"

const StyledImgWrap = styled.div`
    width: ${props => props.$width || 20}px;
`

const CurrencyFlag = (props) => {
    const {
        currency,
        width
    } = props

    return (
        <StyledImgWrap $width={width} className={styles['currency-flag']}>
            <img src={flags[currency ? currency.toLowerCase() : '$$$']} alt="Currency Flag" />
        </StyledImgWrap>
    )
}

export default CurrencyFlag;