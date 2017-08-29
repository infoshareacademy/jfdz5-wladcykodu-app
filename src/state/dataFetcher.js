const ADD = 'dataFetcher/ADD'

export const add = apiData => ({
    type: ADD,
    apiData
})


const initialState = {
    apiData: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
               apiData: action.apiData
            }
        default:
            return state
    }
}