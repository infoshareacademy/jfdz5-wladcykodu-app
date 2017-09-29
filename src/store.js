import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import auth, {authUser} from './state/user'
import favs, {addFav}from './state/favs'
import {firebaseApp} from './firebase'
import * as firebase from 'firebase'

const reducer = combineReducers({
  auth,
  favs
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

  if (user !== null) {
    const user = firebase.auth().currentUser

    firebase.database().ref('/favorites/' + user.uid).on('value', snapshot => {
      store.dispatch(addFav(snapshot.val() || []))
    })
  }
})

export default store