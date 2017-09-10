import React, {Component} from 'react'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import * as toastr from 'toastr'
import {Link} from 'react-router-dom'
import {firebaseApp} from '../../firebase'
import {user} from '../../state/user'
import './auth.css'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaGooglePlus from 'react-icons/lib/fa/google-plus'

const providerForFacebook = new firebase.auth.FacebookAuthProvider()
const providerForGoogle = new firebase.auth.GoogleAuthProvider()

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        error: {
            message: ''
        }
    }

    facebookLoginHandler = (event) => {
        event.preventDefault()
        firebase.auth().signInWithPopup(providerForFacebook).then(result => {
        }).catch(error => {
            toastr.error(error.message)
        })
    }

    googleLoginHandler = (event) => {
        event.preventDefault()
        firebase.auth().signInWithPopup(providerForGoogle).then(result => {
        }).catch(error => {
            toastr.error(error.message)
        })
    }

    handleChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    signInHandler = (event) => {
        const {email, password} = this.state
        event.preventDefault()
        this.props.isUserSignedIn(email, password)
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                toastr.success('You are now signed in !')
            }).catch(error => {
            this.setState({error})
            toastr.error(error.message)
        })
    }

    render() {
        return (
            <div>
                <h1>Sign In form</h1>
                <Form horizontal onSubmit={this.signInHandler}>

                    <Button type="submit" className="login-btn"
                            onClick={this.facebookLoginHandler}>
                            Sign in with <FaFacebook size={25}/></Button>

                    <Button type="submit" className="login-btn"
                            onClick={this.googleLoginHandler}>
                            Sign in with <FaGooglePlus size={25}/></Button>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email"
                                         placeholder="youremailhere@example.com"
                                         value={this.state.email}
                                         onChange={this.handleChange}
                                         autoComplete="email"
                                         name="email"
                                         className="login-form-control" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password"
                                         placeholder="**************"
                                         value={this.state.password}
                                         onChange={this.handleChange}
                                         autoComplete="new-password"
                                         name="password"
                                         className="login-form-control" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col xsOffset={1} smOffset={2} xs={8}>
                            <ButtonToolbar>
                                <Button type="submit">
                                    Sign in
                                </Button>
                                <Button type="button">
                                    <Link to={'/signup'}>
                                        Need an account? Sign up instead
                                    </Link>
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>
                    <Col xsOffset={1} smOffset={2} xs={8}>
                        <div>{this.state.error.message}</div>
                    </Col>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    isUserSignedIn: (email, password) => dispatch(user(email, password))
})

export default connect(
    null,
    mapDispatchToProps,
)(SignIn)