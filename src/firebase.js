import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCzmmxiuqmE971zwgzYgYA3_nQ_2vh7jjw",
    authDomain: "car-parts-search-app.firebaseapp.com",
    databaseURL: "https://car-parts-search-app.firebaseio.com",
    projectId: "car-parts-search-app",
    storageBucket: "car-parts-search-app.appspot.com",
    messagingSenderId: "586463605398"
}

export const firebaseApp = firebase.initializeApp(config)