import React from 'react'
import HomeView from './views/HomeView'
import SignIn from './authorization/SignIn'
import SignUp from './authorization/SignUp'
import UserPanelView from './views/UserPanelView'
import CarModel from './views/CarModel'
import PartCategory from './views/PartCategory'
import PartsList from './views/PartsList'
import Part from './views/Part'

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
            <Route exact path="/brands/:manufacturer/:model/:engineId/:partsTypeId/:partsId" component={PartsList}/>
            <Route exact path="/brands/:manufacturer/:model/:engineId/:partsTypeId" component={PartsList}/>
            <Route exact path="/brands/:manufacturer/:model/:engineId" component={PartCategory}/>
            <Route exact path="/brands/:part/:partNum" component={Part}/>
            <Route exact path="/brands/:manufacturer" component={CarModel}/>
            <Route path="/userpanel" component={UserPanelView}/>
            <Route render={() => <h1>Not found</h1>}/>
        </Switch>
    </Grid>
)
export default Content