import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router
} from 'react-router-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import './index.css'

import store from './store'
import { firebaseApp } from './firebase'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
