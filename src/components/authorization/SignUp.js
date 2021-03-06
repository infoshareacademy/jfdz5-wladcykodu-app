import React, {Component} from 'react'
import {Form, FormGroup, FormControl, Col, Button, ButtonToolbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import * as toastr from 'toastr'
import * as firebase from 'firebase'
import './auth.css'
import {connect} from 'react-redux'
import {authUser} from '../../state/user'

class SignUp extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    user: null,
    error: {
      message: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signUpHandler = (event) => {

    const {email, password, confirmPassword, username} = this.state
    if (password === confirmPassword) {
      event.preventDefault()
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          toastr.success('Successfully signed up !')
          user.updateProfile({
            displayName: username
          })
          firebase.database().ref('users/' + user.uid).set({
            email: user.email,
            name: username
          })
        }).catch(error => {
        this.setState({error})
        toastr.error(error.message)
      })
      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
      })

    } else if (password !== confirmPassword) {
      toastr.error('You need to repeat password correctly!')
      this.setState({
        password: '',
        confirmPassword: ''
      })
    }
  }

  render() {
    return (

      <div>
        <Form horizontal>
          <FormGroup controlId="formHorizontalName" onChange={this.handleChange}>
            <Col sm={10}>
              <FormControl type="text"
                           placeholder="Name"
                           value={this.state.username}
                           autoComplete="name"
                           name="username"
                           className="login-form-control" required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail" onChange={this.handleChange}>
            <Col sm={10}>
              <FormControl type="email"
                           placeholder="E-mail"
                           value={this.state.email}
                           autoComplete="email"
                           name="email"
                           className="login-form-control" required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword" onChange={this.handleChange}>
            <Col sm={10}>
              <FormControl type="password"
                           placeholder="Password"
                           value={this.state.password}
                           autoComplete="new-password"
                           name="password"
                           className="login-form-control" required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalConfirmPassword" onChange={this.handleChange}>
            <Col sm={10}>
              <FormControl type="password"
                           placeholder="Confirm password"
                           value={this.state.confirmPassword}
                           autoComplete="new-password"
                           name="confirmPassword"
                           className="login-form-control" required/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col xs={10}>
              <ButtonToolbar>
                <Button type="button" onClick={this.signUpHandler}
                        className="login-btn">
                  Sign up
                </Button>

                <Button className="login-btn" onClick={() => this.props.handleTabChange(1)}>
                  <Link to={'/signin'}>
                    Already have an account? Sign in
                  </Link>
                </Button>
              </ButtonToolbar>
              <p className="form-note"> By clicking "Sign up", you agree to <span className="agree-text"> <Link
                to={'/signin'}> AutoPartsSearch's Terms of Service  </Link></span>and <span className="agree-text"><Link to={'/signup'}>Privacy Policy</Link></span></p>
            </Col>
          </FormGroup>
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