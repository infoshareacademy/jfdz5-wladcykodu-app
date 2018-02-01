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
        if (history.location.pathname === '/signin' || history.location.pathname === '/signup') {
          history.push('/')
        }
      } else {
        this.setState({
          user: null
        })
        history.push('/signin')
      }
    })
  }

  handleTabChange = key => this.setState({tabKey: key})

  render() {
    return (
      <div className="app-container">
        {
          this.state.user === null ?
            (<div className="wrapper">
                <div className="sign-container">
                  <Grid>
                    <Row>
                      <Col xs={12} md={6}>
                        <div className="img-wrapper">
                          <Image src={require('../images/logo-welcome.png')}
                                 alt="logo of auto parts app"
                                 className="logo-img"/>
                        </div>
                        <div className="welcome-wrapper">
                          <h2>Welcome to AutoParts search app!</h2>
                          <h4>We hope you'll find the car parts you're looking for. </h4>
                          <h5>To start searching from our awesome parts, please sign in or sign
                            up.</h5>
                        </div>
                      </Col>
                      <Col xs={12} md={6}>
                        <div className="forms-wrapper">
                          <Tabs activeKey={this.state.tabKey} id="tab" onSelect={this.handleTabChange}>
                            <Tab eventKey={1} title="Sign in">
                              <SignIn handleTabChange={this.handleTabChange}/>
                            </Tab>

                            <Tab eventKey={2} title="Sign up">
                              <SignUp handleTabChange={this.handleTabChange}/>
                            </Tab>
                          </Tabs>
                        </div>
                      </Col>
                    </Row>
                  </Grid>
                </div>
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