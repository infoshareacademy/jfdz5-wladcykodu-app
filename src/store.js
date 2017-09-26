import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import auth, {authUser} from './state/user'
import {firebaseApp} from './firebase'
import favs from './state/favs'
import comp from './state/comparision'

const reducer = combineReducers({
  auth,
  favs,
  comp
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