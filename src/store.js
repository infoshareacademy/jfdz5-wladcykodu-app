import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import parts from './state/parts'

const reducer = combineReducers({
    parts
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
)

const store = createStore(
    reducer,
    enhancer
)

export default store