// Action type
const USER_SIGNED_IN = 'auth/USER_SIGNED_IN'

// Action creator
export const authUser = (user) => ({
    type: USER_SIGNED_IN,
    user
})

// Initial state
const initialState = {
    user: null
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNED_IN:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}