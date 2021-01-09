import React from 'react'
import './InputText.scss'

const InputText = ({value}) => {
    return <input className="form-input" type="text" placeholder={value} />
}

export default InputText
