import React, { useContext } from 'react'
import LoginForm from './loginForm'
import RegisterForm from './RegisterForm'
import { AuthContext } from '../../contexts/AuthContext'
import { Redirect } from 'react-router-dom'


const Author = ({ auth }) => {
    const { authState: { isAuthenticated } } = useContext(AuthContext)
    let body

    if (isAuthenticated) {
        return <Redirect to="/dasboard" />
    } 
    else {
        body = (
            <>
                {auth === 'login' && <LoginForm />}
                {auth === 'register' && <RegisterForm />}
            </>
        )
    }

    return (
        <div className="main">
            <div  className="form">
            <h3 className="heading">{auth === 'login' ? 'Login' : 'Register Account'}</h3>
            <p className="desc">❤❤️❤</p>
        
            <div className="spacer"></div>
                { body }
            <span></span>
            
            </div>
        </div>
    )
}

export default Author
