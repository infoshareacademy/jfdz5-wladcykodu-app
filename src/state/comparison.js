const ADD = 'comparison/ADD'

export const add = compareParts => ({ type: ADD, compareParts })

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
        comparison: [...state.comparison, action.compareParts]
      }
    default:
      return state
  }
}