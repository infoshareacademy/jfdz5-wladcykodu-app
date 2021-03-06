// Action type
export const SET = 'tree/SET'

// Action creator
export const setTreeNode = (level, node, parentPosition) => ({
    type: SET,
    level,
    node,
    parentPosition
})


// Action type
export const TRUNCATE = 'tree/TRUNCATE'

// Action creator
export const truncateTree = (level) => ({
  type: TRUNCATE,
  level
})


// Initial state
const initialState = {
    dataNodes: [],
    positions: []
}

const checkPosition = (position) => {
  if (position >=0 && position !== null) {
    return true
  } else {
    return false
  }
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SET:
            return {
                ...state,
                dataNodes: action.level > 0 && state.dataNodes.length >= action.level
                    ? state.dataNodes.slice(0, action.level).concat(action.node)
                    : ( action.level === 0
                        ? [action.node]
                        : state.dataNodes ),
                positions: action.level > 0 && state.positions.length >= action.level
                    ? state.positions.slice(0, action.level - 1)
                        .concat(
                          checkPosition(action.parentPosition)
                          ? action.parentPosition
                          : state.positions[action.level - 1],
                          null //0
                        )
//                    : ( action.level === 0
//                        ? [null] //0
//                        : state.positions )
              : [null]
            }
      case TRUNCATE:
        return {
          ...state,
          dataNodes: state.dataNodes.slice(0, action.level),
          positions: state.positions.slice(0, action.level - 1).concat(null)
        }
        default:
            return state
    }
}