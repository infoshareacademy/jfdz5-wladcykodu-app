// Action type
const AUTH_USER = 'auth/AUTH_USER'

// Action creator
export const authUser = (user) => ({
  type: AUTH_USER,
  user
})

// Initial state
const initialState = {
  user: null
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}