// Action type
const SET_FAVS = 'favs/SET_FAVS'

// Action creator
export const setFavs = favs => ({
  type: SET_FAVS,
  favs
})

// Initial state
const initialState = {
  favorites: []
}

// Reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FAVS:
      return {
        favorites: action.favs
      }
    default:
      return state
  }
}