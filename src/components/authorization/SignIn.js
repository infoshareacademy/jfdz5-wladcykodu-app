import React, {Component} from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  InputGroup,
  Col,
  Button,
  ButtonToolbar,
  Modal,
} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import * as toastr from 'toastr'
import {Link} from 'react-router-dom'
import {authUser} from '../../state/user'
import './auth.css'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaGoogle from 'react-icons/lib/fa/google'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'

const providerForFacebook = new firebase.auth.FacebookAuthProvider()
const providerForGoogle = new firebase.auth.GoogleAuthProvider()

class SignIn extends Component {

  state = {
    email: '',
    password: '',
    error: {
      message: ''
    },
    type: 'password',
    show: false,
    emailForSendPassword: '',
    visible: true
  }

  facebookLoginHandler = (event) => {
    event.preventDefault()
    firebase.auth().signInWithPopup(providerForFacebook).then(result => {
      toastr.success('Successfully signed in with Facebook')
      const user = result.user
      firebase.database().ref('users/' + user.uid).set({
        email: user.email,
        name: user.displayName
      }).catch(error => {
        toastr.error(error.message)
      })
    })
  }

  googleLoginHandler = (event) => {
    event.preventDefault()
    firebase.auth().signInWithPopup(providerForGoogle).then(result => {
      toastr.success('Successfully signed in with Google')
      const user = result.user
      firebase.database().ref('users/' + user.uid).set({
        email: user.email,
        name: user.displayName
      }).catch(error => {
        toastr.error(error.message)
      })
    })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signInHandler = (event) => {
    const {email, password} = this.state
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        toastr.success('You are now signed in !')
      }).catch(error => {
      this.setState({error})
      toastr.error(error.message)
    })
  }

  resetPasswordHandler = (event) => {
    event.preventDefault();
    const {emailForSendPassword} = this.state

    firebase.auth().sendPasswordResetEmail(emailForSendPassword)
      .then(() => {
        toastr.success('Check your e-mail for the confirmation link!')
      }).catch(error => {
      this.setState({error})
      toastr.error(error.message)
    })
  }

  showOrHide() {
    this.setState({
      type: this.state.type === 'password' ? 'input' : 'password'
    })
  }

  changeVisibility() {
    this.setState({
      visible: !this.state.visible,
      show: true
    })
  }

  render() {
    let close = () => this.setState({show: false, visible: !this.state.visible})
    let visible = this.state.visible ? "visible" : "hidden"

    return (
      <Col className="form-wrapper">
        <Form horizontal onSubmit={this.signInHandler}>

          <Button className="login-btn"
                  onClick={this.facebookLoginHandler}>
            Sign in with <FaFacebook size={25}/></Button>

          <Button className="login-btn"
                  onClick={this.googleLoginHandler}>
            Sign in with <FaGoogle size={25}/></Button>

          <FormGroup controlId="formHorizontalEmail">
            <Col sm={10}>
              <FormControl type="email"
                           placeholder="E-mail"
                           value={this.state.email}
                           onChange={this.handleChange}
                           autoComplete="email"
                           name="email"
                           className="login-form-control" required/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={10}>
              <InputGroup>
                <FormControl type={this.state.type}
                             placeholder="Password"
                             value={this.state.password}
                             onChange={this.handleChange}
                             autoComplete="new-password"
                             name="password"
                             className="login-form-control" required/>
                <InputGroup.Button>
                  <Button
                    onClick={() => this.showOrHide()}>{this.state.type === 'input' ?
                    <FaEyeSlash size={18}/> : <FaEye size={18}/>}</Button>
                </InputGroup.Button>
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xs={10}>
              <ButtonToolbar>
                <Button type="submit" className="login-btn">
                  Sign in
                </Button>

                <Button className="login-btn" onClick={() => this.props.handleTabChange(2)}>
                  <Link to={'/signup'}>
                    Need an account? Sign up instead
                  </Link>
                </Button>
              </ButtonToolbar>

              <div className="modal-container" style={{height: 200}}>
                <Button
                  className="modal-btn"
                  bsSize="xsmall"
                  style={{visibility: visible}} onClick={() => this.changeVisibility()}
                >
                  Forgot Password ?
                </Button>

                <Modal
                  show={this.state.show}
                  onHide={close}
                  container={this}
                  aria-labelledby="contained-modal-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Forgot your Password? Now you can recover it! </Modal.Title>
                  </Modal.Header>
                  <Form horizontal onSubmit={this.resetPasswordHandler}>
                    <Modal.Body className="modal-body">
                      <p>Please enter your e-mail to reset password for your account.</p>
                      <FormGroup controlId="formHorizontalEmailReset" onChange={this.handleChange}>
                        <Col>
                          <FormControl
                            type="email"
                            placeholder="E-mail"
                            value={this.state.emailForSendPassword}
                            onChange={this.handleChange}
                            autoComplete="emailForSendPassword"
                            name="emailForSendPassword"
                            className="login-form-control modal-form" required/>
                        </Col>
                      </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button type="submit">Send</Button>
                      <Button onClick={close}>Cancel</Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  authUser: (user) => dispatch(authUser(user))
})

export default connect(
  null,
  mapDispatchToProps,
)(SignIn)