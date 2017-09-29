// Action type
export const SET = 'tree/SET'

// Action creator
export const setTreeNode = (node, level, position) => ({
    type: SET,
    node,
    level,
    position
})

// Initial state
const initialState = {
    tree: [],
    positions: []
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SET:
            return {
                ...state,
                tree: action.level > 0 && state.tree.length >= action.level
                    ? state.tree.slice(0, action.level).concat([action.node])
                    : ( action.level === 0
                        ? [action.node]
                        : state.tree ),
                positions: action.level > 0 && state.positions.length >= action.level
                    ? state.positions.slice(0, action.level - 1)
                        .concat([
                            action.position || state.positions[action.level - 1],
                            0
                        ])
                    : ( action.level === 0
                        ? [0]
                        : state.positions )
            }
        default:
            return state
    }
}