import React from 'react'
import './InputTextPayment.scss'

const InputTextPayment = ({value}) => {
    return <input className="form-input-payment" type="text" placeholder={value} />
}

export default InputTextPayment
