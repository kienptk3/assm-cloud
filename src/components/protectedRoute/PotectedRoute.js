import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Narbar from '../layouts/Narbar'

const PotectedRouter = ({component: Component, ...rest}) => {
    const { authState: { isAuthenticated } } = useContext(AuthContext)

    return (
        <Route {...rest} render={props => 
            isAuthenticated ? (<>
                <Narbar />
                <Component {...rest} {...props} />
            </>) : (<Redirect to='/' />)}
        />
    )
}

export default PotectedRouter

