import React from 'react'
import './ButtonLandingRegister.scss'

const ButtonLandingRegister = ({title, ...rest}) => {
    return (
        <button className="button" {...rest}>{title}</button>
    )
}

export default ButtonLandingRegister
