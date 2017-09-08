import React from 'react'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {firebaseApp} from '../../firebase'

class SignUp extends React.Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        user: null
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
                    console.log('Success')
                }).catch((event => console.log('error')))
            this.setState({
                email: '',
                password: '',
                confirmPassword: ''
            })
        } else if (password !== confirmPassword) {
            console.log('Repeat password correctly!')
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
            } else {
                this.setState({
                    user: null
                })
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

                    <FormGroup controlId="formHorizontalPassword">
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
                                        className="login-btn login-btn-primary">
                                    Sign up
                                </Button>
                                <Button type="submit"
                                        className="login-btn login-btn-primary">
                                    <Link to={'/signin'}>
                                        Already have an account? Sign in
                                    </Link>
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        )
    }
}

export default SignUp
