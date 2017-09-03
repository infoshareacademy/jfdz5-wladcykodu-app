const SET_PARTS = 'parts/SET_PARTS'
export const setParts = parts => ({
    type: SET_PARTS,
    parts
})

export const fetchParts = () => dispatch => {
    fetch(
        '/api/v2?lang=polish'
    ).then(
        response => response.json()
    ).then(
        parts => dispatch(setParts(parts))
    )
}

const initialState = []

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_PARTS:
            return action.parts
        default:
            return state
    }
}