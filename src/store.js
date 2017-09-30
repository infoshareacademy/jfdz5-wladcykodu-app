import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import auth, {authUser} from './state/user'
import favs, {setFavs}from './state/favs'
import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import compareParts from './state/comparision'

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

  if (user !== null) {
    const user = firebase.auth().currentUser

    firebase.database().ref('/favorites/' + user.uid).on('value', snapshot => {
      store.dispatch(setFavs(snapshot.val() || []))
    })
  }
})

export default store