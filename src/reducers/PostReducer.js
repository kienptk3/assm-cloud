export const PostReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'GET_POST':
            return {
                ...state,
                posts: payload,
                postLoaded: false
            }
        case 'FIND_POST': 
            return {
                ...state,
                post: payload
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, payload]
            }
        case 'UPDATE_POST':
            const newPost = state.posts.map(post => post._id === payload._id ? payload : post)
            return {
                ...state,
                posts: newPost
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter( post => post._id !== payload._id)
            }
        default:
            return state
    }
}