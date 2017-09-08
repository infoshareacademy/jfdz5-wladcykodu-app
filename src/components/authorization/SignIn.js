import React from 'react'
import {Form, FormGroup, FormControl, Col, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {firebaseApp} from '../../firebase'

class SignIn extends React.Component {

    state = {
        email: '',
        password: '',
        error: {
            message: ''
        }
    }

    handleChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    signInHandler = (event) => {
        const {email, password} = this.state
        event.preventDefault()
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Logged in')
            }).catch(error => {
            this.setState({error})
            console.log('Wrong email or password!')
        })
    }

    render() {
        return (
            <div>
                <h1>Sign In form</h1>
                <Form horizontal onSubmit={this.signInHandler}>

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
                                <Button type="submit" className="login-btn login-btn-primary">
                                    Sign in
                                </Button>
                                <Button type="submit" className="login-btn login-btn-primary">
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

export default SignIn
