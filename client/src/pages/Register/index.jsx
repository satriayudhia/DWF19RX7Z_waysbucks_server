import React from 'react'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import InputText from '../../components/atoms/InputText'
import './Register.scss'

const Register = () => {
    return (
        <div className="register-wrapper">
            <p className="title-register">Register</p>
            <InputText value="Email" />
            <Gap height={20} />
            <InputText value="Password" />
            <Gap height={20} />
            <InputText value="Full Name" />
            <Gap height={29} />
            <Button title="Register" />
            <p className="to-login">Already have an account ? Click <strong>Here</strong></p>
        </div>
    )
}

export default Register
