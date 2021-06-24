import React, { useReducer, createContext, useEffect } from 'react'
import { AuthReducer } from '../reducers/AuthReducer'
import { api, TOKEN_NAME } from './api'
import axios from 'axios'
import setAuthToken from '../untils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        isLoading: true,
        isAuthenticated: false,
        users: null
    })


    // Load user
    const loadUser = async () => {
        const Token = localStorage[TOKEN_NAME]
        if (Token) {
            setAuthToken(Token)
        }

        try {
            const response = await axios.get(`${api}/author`)

            if (response.data.success) {
                dispatch({
                    type: 'GET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        users: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(TOKEN_NAME)
            setAuthToken(null)
            dispatch ({
                type: 'GET_AUTH',
                payload: {
                    isAuthenticated: false,
                    users: null
                }
            })
        }
    }

    useEffect(() => loadUser(), [])

    // Login
    const login = async (userData) => {
        try {
            const response = await axios.post(`${api}/author/login`, userData)

            if (response.data.success) {
                localStorage.setItem(TOKEN_NAME, response.data.accessToken)
            }
            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }


    // Register
    const register = async (userData) => {
        try {
            const response = await axios.post(`${api}/author/register`, userData)

            if (response.data.success) {
                return response.data
            }
        } catch (error) {
            return error.response.data
        }
    }

    // Log out the user
    const logOut = () => {
        localStorage.removeItem(TOKEN_NAME)
            setAuthToken(null)
            dispatch ({
                type: 'GET_AUTH',
                payload: {
                    isAuthenticated: false,
                    users: null
                }
            })
    }

    // Data provider
    const authContextData = {
        authState,
        login,
        register,
        logOut,
    }

    return (
        <AuthContext.Provider value={authContextData}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
