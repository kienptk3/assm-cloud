import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import AlertMessage from '../layouts/Alert'

const RegisterForm = () => {
    const history = useHistory()
    // Get userData from user on input
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const { username, password, confirmPassword } = userData

    const onChangeInputForm = (event) => {
        return setUserData({ ...userData, [event.target.name]: event.target.value }) 
    }

    // Alert Message
    const [alertMessage, setAlertMessage] = useState(null)

    // handle register
    const { register } = useContext(AuthContext)

    const onSubmitForm = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setAlertMessage({ type: 'danger', message: 'Please enter match passwork'})
            setTimeout(() => setAlertMessage(null), 2000)
            return
        }

        try {
            const registed = await register(userData)
            if (registed.success) {
                setAlertMessage({ type: 'success', message: registed.message})
                setTimeout(() => (setAlertMessage(null), history.push('/login')), 2000)
            } else {
                setAlertMessage({type:'danger', message: registed.message})
                setTimeout(() => setAlertMessage(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
             <Form onSubmit={onSubmitForm}>
                <Form.Group>
                    <Form.Control type="text" placeholder="Username" name="username" onChange={onChangeInputForm} value={username} required />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChangeInputForm} value={password}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Confim password" name="confirmPassword" onChange={onChangeInputForm} value={confirmPassword} />
                </Form.Group>
                <AlertMessage info={alertMessage} />
                <Button variant="success" type="submit" className="form-submit">Register</Button>
            </Form>
            <p className="register">Please Login
            <Link to="/login" className="btn">
                <Button variant="info" size="sm" className="mt-2">Login</Button>
            </Link>
            </p>
        </div>
    )
}

export default RegisterForm
