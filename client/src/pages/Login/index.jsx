import React from 'react'
import {useHistory} from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import InputText from '../../components/atoms/InputText'
import './Login.scss'

const Login = () => {
    const router = useHistory();

    const toHomePage = () => {
      router.push("/home")
    }
    
    return (
        <div className="login-wrapper">
            <p className="title-login">Login</p>
            <InputText value="Email" />
            <Gap height={20} />
            <InputText value="Password" />
            <Gap height={29} />
            <Button title="Login" onClick={toHomePage} />
            <p className="to-register">Don't have an account ? Click <strong>Here</strong></p>
        </div>
    )
}

export default Login
