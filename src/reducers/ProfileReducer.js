export const ProfileReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'GET_POST_PROFILE':
            return {
                ...state,
                profileLoaded: false,
                postsProfile: payload
            }
        default:
            return state
    }
}