import React from 'react'
import './ButtonLandingLogin.scss'

const ButtonLandingLogin = ({title, ...rest}) => {
    return (
        <button className="button-log" {...rest}>{title}</button>
    )
}

export default ButtonLandingLogin
