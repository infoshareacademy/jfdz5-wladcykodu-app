import { createStore, combineReducers } from 'redux'
import dataFetcher from './state/dataFetcher'

const reducer = combineReducers({
    dataFetcher
})

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store