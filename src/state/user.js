// Action type
const USER_SIGNED_IN = 'user/USER_SIGNED_IN'

// Action creator
export const user = (email, password) => ({
    type: USER_SIGNED_IN,
    email,
    password
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
                user: {
                    email: action.email,
                }
            }
        default:
            return state
    }
}