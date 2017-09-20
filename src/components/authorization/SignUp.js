import React, {Component} from 'react'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import * as toastr from 'toastr'
import {firebaseApp} from '../../firebase'
import './auth.css'
import {connect} from 'react-redux'
import {authUser} from '../../state/user'

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        user: null,
        error: {
            message: ''
        }
    }

    handleChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    handleConfirmPassword = event =>
        this.setState({
            confirmPassword: event.target.value
        })

    signUpHandler = (event) => {

        const {email, password, confirmPassword} = this.state
        if (password === confirmPassword) {
            event.preventDefault()
            firebaseApp.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    toastr.success('Successfully signed up !')
                }).catch(error => {
                this.setState({error})
                toastr.error(error.message)
            })
            this.setState({
                email: '',
                password: '',
                confirmPassword: ''
            })
        } else if (password !== confirmPassword) {
            toastr.error('You need to repeat password correctly!')
            this.setState({
                password: '',
                confirmPassword: ''
            })
        }
    }

    componentWillMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: user
                })
                console.log('user is signed in or up', user)
            } else {
                this.setState({
                    user: null
                })
                console.log('user is signed out')
            }
        })
    }

    render() {
        return (

            <div>
                <h1>Sign Up form</h1>
                <Form horizontal>

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

                    <FormGroup controlId="formHorizontalConfirmPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Confirm Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password"
                                         placeholder="**************"
                                         value={this.state.confirmPassword}
                                         onChange={this.handleConfirmPassword}
                                         autoComplete="new-password"
                                         name="confirm-password"
                                         className="login-form-control" required/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col xsOffset={1} smOffset={2} xs={8}>
                            <ButtonToolbar>
                                <Button type="button" onClick={this.signUpHandler}
                                        className="login-btn">
                                    Sign up
                                </Button>
                                <Button type="button"
                                        className="login-btn">
                                    <Link to={'/signin'}>
                                        Already have an account? Sign in
                                    </Link>
                                </Button>
                            </ButtonToolbar>
                            <p className="form-note"> By clicking "Sign up", you agree to AutoPartsSearch's Terms of
                                Service and Privacy Policy</p>
                        </Col>
                    </FormGroup>
                    <Col>
                        <div>{this.state.error.message}</div>
                    </Col>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    authUser: (user) => dispatch(authUser(user))
})

export default connect(
    null,
    mapDispatchToProps,
)(SignUp)