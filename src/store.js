import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import auth, {authUser} from './state/user'
import {firebaseApp} from './firebase'
import favs from './state/favs'
import compareParts from './state/comparison'

const reducer = combineReducers({
  auth,
  favs,
  compareParts
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  persistState(['compareParts']),
)

const store = createStore(
  reducer,
  enhancer
)

firebaseApp.auth().onAuthStateChanged(user => {
  store.dispatch(authUser(user))
})

export default store