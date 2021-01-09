import Content from '../../components/molecules/Content'
import './LandingLogin.scss'
import HeaderLogin from '../../components/molecules/HeaderLogin'

const LandingLogin = () => {
    // const user = JSON.parse(localStorage.getItem('userInfo'))
    return (
            <div>
                <div>
                    <HeaderLogin/>
                </div>
                <div className="content-wrapper-login">
                    <Content /> 
                </div>
            </div>
    )
}

export default LandingLogin
