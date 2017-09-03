import React from 'react'
import HomeView from './views/HomeView'
import SignIn from './authorization/SignIn'
import SignUp from './authorization/SignUp'
import UserPanel from './UserPanel'
import CarModel from './views/CarModel'
import {
    Switch,
    Route
} from 'react-router-dom'
import {
    Grid
} from 'react-bootstrap'
const Content = () => (
    <Grid>
        <Switch>
            <Route exact path="/" component={HomeView}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route exact path="/brands/:pid" component={CarModel}/>
            <Route exact path="/brands/:pid/:cid" component={CarModel}/>
            <Route path="/userpanel" component={UserPanel}/>
            <Route render={() => <h1>Not found</h1>}/>
        </Switch>
    </Grid>
)
export default Content