import React from 'react'
import './InputNumberProduct.scss'

const InputNumberProduct = ({value}) => {
    return <input className="form-number-product" type="number" placeholder={value} />
}

export default InputNumberProduct
