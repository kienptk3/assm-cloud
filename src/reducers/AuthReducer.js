export const AuthReducer = (state, action) => {

    const {type, payload: {isAuthenticated, users } } = action
    switch (type) {
        case 'GET_AUTH':
            return {
                ...state,
                isLoading: false,
                isAuthenticated,
                users
            }
        default:
            return state
    }
}