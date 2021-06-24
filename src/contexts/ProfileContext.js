import React, { useReducer, createContext } from 'react'
import { ProfileReducer } from '../reducers/ProfileReducer'
import axios from 'axios'
import { api } from './api'


export const ProfileContext = createContext()


const ProfileContextProvider = ({ children }) => {
    const [profile, dispatch] = useReducer(ProfileReducer, {
        profileLoaded: true,
        postsProfile: [],
    })

    // Get post profile
    const getPostProfile = async (userId) => {
        try {
            const response = await axios.get(`${api}/profile/${userId}`)

            if (response.data.success) {
                dispatch({ type: 'GET_POST_PROFILE', payload: response.data.profile })
                return response.data
            }
        } catch (error) {
            return error.response.message ? error.response.message : 'Internal server error'
        }
    }



    // Context data
    const profileContextData = {
        profile,
        getPostProfile,
    }

    return (
        <ProfileContext.Provider value={ profileContextData }>
            { children }
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider
