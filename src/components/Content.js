import React from 'react'
import HomeView from './views/HomeView'
import SignIn from './authorization/SignIn'
import SignUp from './authorization/SignUp'
import UserPanelView from './views/UserPanelView'
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
            <Route path="/userpanel" component={UserPanelView}/>
            <Route render={() => <h1>Not found</h1>}/>
        </Switch>
    </Grid>
)
export default Content