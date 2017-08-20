import React from 'react'
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
            <Route render={() => <h1>Not found</h1>}/>
        </Switch>
    </Grid>
)

export default Content