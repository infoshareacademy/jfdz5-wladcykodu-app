import React from 'react'
import SignIn from './authorization/SignIn'
import SignUp from './authorization/SignUp'
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
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route render={() => <h1>Not found</h1>}/>

        </Switch>
    </Grid>
)

export default Content