import React, { useReducer, createContext, useState } from 'react'
import { PostReducer } from '../reducers/PostReducer'
import { api } from './api'
import axios from 'axios'

export const PostContext = createContext()


const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(PostReducer, {
        postLoaded: true,
        posts: [],
        post: {}
    })

    // state show modal
    const [showModal, setShowModal] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    // Find post
    const findPost = (id) => {
        const postData = postState.posts.find(post => post._id === id)
        dispatch({ type: 'FIND_POST', payload: postData })
    }
    console.log(postState)
    // Get posts
    const getPost = async () => {
        try {
            const response = await axios.get(`${api}/posts`)
            if (response.data.success) {
                dispatch({
                    type: 'GET_POST',
                    payload: response.data.posts
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    // Create new post
    const createPost = async (newPostData) => {
        try {
            const response = await axios.post(`${api}/posts/create`, newPostData)

            if (response.data.success) {
                dispatch({ type: 'ADD_POST', payload: response.data.newPost })
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }


    // Deleted post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${api}/posts/${postId}`)

            if (response.data.success) {
                dispatch({ type: 'DELETE_POST', payload: response.data.post })
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    // Update post
    const updatePost = async (postData) => {
        try {
            const response = await axios.put(`${api}/posts/${postData._id}`, postData)
            if (response.data.success) {
                dispatch({ type: 'UPDATE_POST', payload: response.data.post })
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    
    const postContextData = {
        postState,
        showModal,
        setShowModal,
        showUpdate,
        setShowUpdate,
        getPost,
        createPost,
        deletePost,
        updatePost,
        findPost,
    }
    
    return (
        <PostContext.Provider value={ postContextData }>
            { children }
        </PostContext.Provider>
    )
}

export default PostContextProvider
