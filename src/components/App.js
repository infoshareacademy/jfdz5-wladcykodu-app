import React, {Component} from 'react'
import * as firebase from 'firebase'
import {Grid, Col, Image, Tabs, Tab, Row} from 'react-bootstrap'
import MainMenu from './MainMenu'
import Content from './Content'
import Footer from './Footer'
import SignIn from './authorization/SignIn'
import SignUp from './authorization/SignUp'
import './App.css'
import {history} from '../index'

class App extends Component {

  state = {
    user: null,
    tabKey: 1
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        })
        if (history.location.pathname === '/') {
          history.push('/dashboard')
        }
      } else {
        this.setState({
          user: null
        })
        history.push('/')
      }
    })
  }

  handleTabChange = key => this.setState({ tabKey: key })

  render() {
    return (
      <div className="app-container">
        {
          this.state.user === null ?
            (<div className="sign-container">
                <Grid>
                  <Row>
                    <Col xs={12} md={6}>
                      <Image src={require('../images/logo-image.png')}
                             alt="logo of auto parts app"/>
                      <h2>Welcome to AutoParts search app!</h2>
                      <h4>We hope you'll find the car parts you're looking for. </h4>
                      <h5>To start searching from our awesome parts, please sign in or sign
                        up.</h5>
                    </Col>
                    <Col xs={12} md={6}>
                      <Tabs activeKey={this.state.tabKey} id="tab" onSelect={this.handleTabChange}>
                        <Tab eventKey={1} title="Sign in">
                          <SignIn handleTabChange={this.handleTabChange} />
                        </Tab>

                        <Tab eventKey={2} title="Sign up">
                          <SignUp handleTabChange={this.handleTabChange} />
                        </Tab>
                      </Tabs>
                    </Col>
                  </Row>
                </Grid>
              </div>
            )
            :
            <div className="app-container-private">
              <MainMenu/>
              <Content/>
              <Footer/>
            </div>
        }
      </div>
    )
  }
}

export default App