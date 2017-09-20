import React, {Component} from 'react'
import {firebaseApp} from '../firebase'
import {Grid, Col, Image, Tabs, Tab} from 'react-bootstrap'
import MainMenu from './MainMenu'
import Content from './Content'
import Footer from './Footer'
import SignIn from './authorization/SignIn'
import SignUp from './authorization/SignUp'
import './App.css'


class App extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: user
                })
            } else {
                this.setState({
                    user: null
                })
            }
        })
    }

    render() {
        return (
            <div className="app-container">
                {
                    this.state.user === null ?
                        (<div className="sign-container">
                                <Grid>
                                    <Col xs={6} className="sign-in-up">
                                        <Image src={require('../images/logo-image.png')} alt="logo of auto parts app"/>
                                        <h2>Welcome... to search from our awesome car parts, please sign in/up</h2>

                                        <Tabs defaultActiveKey={1} id="tab">
                                            <Tab eventKey={1} title="Sign in">
                                                <SignIn/>
                                            </Tab>

                                            <Tab eventKey={2} title="Sign up">
                                                <SignUp/>
                                            </Tab>
                                        </Tabs>
                                    </Col>
                                </Grid>
                            </div>
                        )
                        :
                        <div>
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