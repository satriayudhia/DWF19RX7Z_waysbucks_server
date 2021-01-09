import React from 'react'
import './InputTextArea.scss'

const InputTextArea = ({value}) => {
    return <textarea className="form-textarea-payment" placeholder={value} />
}

export default InputTextArea
