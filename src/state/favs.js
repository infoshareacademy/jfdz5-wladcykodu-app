// Action type
export const ADD = 'favs/ADD'

// Action creator
export const addFav = (favId) => ({
  type: ADD,
  favId
})

// Initial state
const initialState = {
  favorites: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        favorites: action.favs
      }
    default:
      return state
  }
}