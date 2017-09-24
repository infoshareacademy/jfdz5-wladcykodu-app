import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import auth, {authUser} from './state/user'
import {firebaseApp} from './firebase'

const reducer = combineReducers({
  auth
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
)

const store = createStore(
  reducer,
  enhancer
)

firebaseApp.auth().onAuthStateChanged(user => {
  store.dispatch(authUser(user))
})

export default store