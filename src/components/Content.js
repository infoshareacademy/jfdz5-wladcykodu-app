import React from 'react'
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import {
  Grid
} from 'react-bootstrap'
import {connect} from 'react-redux'


import HomeView from './views/HomeView'
import UserPanelView from './views/UserPanelView'
import CarModel from './views/CarModel'
import PartCategory from './views/PartCategory'
import PartsList from './views/PartsList'
import Part from './views/Part'
import FavoritesList from './views/FavoritesList'

const Content = () => (
  <Grid>
    <Switch>
      <Route exact path="/brands/:manufacturer/:model/:engineId/:partsTypeId/:partsId" component={PartsList}/>
      <Route exact path="/brands/:manufacturer/:model/:engineId/:partsTypeId" component={PartsList}/>
      <Route exact path="/brands/:manufacturer/:model/:engineId" component={PartCategory}/>
      <Route exact path="/part/:part/:partNum" component={Part}/>
      <Route exact path="/brands/:manufacturer" component={CarModel}/>
      <Route exact path="/userpanel" component={UserPanelView}/>
      <Route exact path="/favorites" component={FavoritesList}/>
      <Route exact path="/" component={HomeView}/>
      <Route render={() => <h1>Not found</h1>}/>
    </Switch>
  </Grid>
)

const ConnectedContent = connect(
  state => ({})
)(Content)

export default withRouter(ConnectedContent)