import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layouts/Alert'

const LoginForm = () => {
    const { login } = useContext(AuthContext)

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const [alertMessage, setAlertMessage] = useState(null)

    const onChangeValue = (event) => setLoginData({ ...loginData, [event.target.name]: event.target.value })

    const { username, password } = loginData 

    const handleSubmitForm = async (event) => {
        event.preventDefault()
        try {
            const logined = await login(loginData)
            if (!logined.success) {
                // history.push('/dasboard')
                setAlertMessage({ type: 'danger', message: logined.message})
                setTimeout(() => setAlertMessage(null), 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmitForm}>
                <Form.Group>
                    <Form.Control type="text" name="username" onChange={onChangeValue} value={username} placeholder="Username" required />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="password" onChange={onChangeValue} value={password} placeholder="Password" />
                </Form.Group>
                <AlertMessage info={alertMessage} />
                <Button variant="success" type="submit" className="form-submit">Login</Button>
            </Form>
            <p className="register">Don't have account ?
            <Link to="/register" className="btn">
                <Button variant="info" size="sm" className="mt-2">Register</Button>
            </Link>
            </p>
        </>
    )
}

export default LoginForm
