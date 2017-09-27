// Action type
export const ADD = 'comparision/ADD'

// Action creator
export const addComp = (comparisionId) => ({
  type: ADD,
  comparisionId
})

// Initial state
const initialState = {
  comparision: []
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        comparision: action.comp
      }
    default:
      return state
  }
}