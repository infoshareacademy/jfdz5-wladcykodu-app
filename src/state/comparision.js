const ADD = 'comparison/ADD'

export const add = comparePart => ({ type: ADD, comparePart })

/*
const REMOVE = 'comparison/REMOVE'
export const remove = partId => ({ type: REMOVE, partId })
*/


const initialState = {
  comparison: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD:
      return {
        ...state,
        comparison: action.comparison
      }
    default:
      return state
  }
}