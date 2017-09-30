import React from 'react'
import {Form, FormGroup, FormControl, ControlLabel, Button, Grid, Row, Col} from 'react-bootstrap'
import styled from 'styled-components'
import './UserPanelView.css'
import * as firebase from 'firebase'
import * as toastr from 'toastr'


const UserFormsContainer = styled.div`
/*	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;*/
`


class UserPanelView extends React.Component {

  state = {
    newEmail: '',
    confirmNewEmail: '',
    newPass: '',
    confirmNewPass: '',
  }

  handlePasswordChange = event => this.setState({
    newPass: event.target.value
  })


  handleConfirmPasswordChange = event => this.setState({
    confirmNewPass: event.target.value
  })


  changeUserPassword = event => {
    event.preventDefault()
    const user = firebase.auth().currentUser
    const newPassword = this.state.newPass
    const confirmPassword = this.state.confirmNewPass


    user.updatePassword(newPassword).then(function () {
      if (newPassword === confirmPassword) {
        toastr.success('Successfully changed password')
      }
    }).catch(function (error) {
      toastr.error(error.message)
    })

  }


  handleEmailChange = event => this.setState({
    newEmail: event.target.value
  })


  handleConfirmEmailChange = event => this.setState({
    confirmNewEmail: event.target.value
  })


  changeUserMail = event => {
    event.preventDefault()
    const user = firebase.auth().currentUser
    const newEmail = this.state.newEmail
    const confirmNewEmail = this.state.confirmNewEmail


    user.updateEmail(newEmail).then(function () {
      if (newEmail === confirmNewEmail) {
        toastr.success('Successfully changed e-mail!')
      }
    }).catch(function (error) {
      toastr.error(error.message)
    })
  }

  removeAccount = () => {
    const user = firebase.auth().currentUser
    user.delete().then(function () {
      toastr.success('Your account has been deleted!')
    }).catch(function (error) {
      toastr.error(error.message)
    });
  }


  render() {
    return (
      <UserFormsContainer>
        <Grid>
          <Row>
            <Col xs="12" md="6" className="user-form">
              <h3>Change password</h3>
              <Form horizontal>
                <FormGroup controlId="formInlinePassword">
                  <ControlLabel>New password</ControlLabel>
                  {' '}
                  <FormControl id="formInlinePassword" type="password" onChange={this.handlePasswordChange}
                               placeholder="********"/>
                </FormGroup>
                {' '}
                <FormGroup controlId="formInlineConfirmPassword">
                  <ControlLabel>Confirm new password</ControlLabel>
                  {' '}
                  <FormControl id="formInlineConfirmPassword" type="password"
                               onChange={this.handleConfirmPasswordChange}
                               placeholder="********"/>
                </FormGroup>
                {' '}
                <Button id="change-password-button" onClick={this.changeUserPassword} type="submit"
                        bsStyle="success">
                  Save
                </Button>
              </Form>
            </Col>
            <Col xs="12" md="6" className="user-form">
              <h3>Change e-mail</h3>
              <Form horizontal>
                <FormGroup controlId="formInlineNewMail">
                  <ControlLabel>New e-mail</ControlLabel>
                  {' '}
                  <FormControl id="formInlineNewMail" type="email" onChange={this.handleEmailChange}
                               placeholder="jane@example.com"/>
                </FormGroup>
                {' '}
                <FormGroup controlId="formInlineConfirmEmail">
                  <ControlLabel>Confirm new e-mail</ControlLabel>
                  {' '}
                  <FormControl id="formInlineConfirmEmail" type="email" onChange={this.handleConfirmEmailChange}
                               placeholder="jane.doe@example.com"/>
                </FormGroup>
                {' '}
                <Button type="submit" onClick={this.changeUserMail} bsStyle="success">
                  Save
                </Button>
              </Form>
            </Col>
            <Col xs="12" className="delete-account">
              <h5>Do you want delete your account? Think carefully.</h5>
              <Button type="submit" onClick={this.removeAccount} bsStyle="danger">
                Delete account
              </Button>
            </Col>
          </Row>
        </Grid>

      </UserFormsContainer>
    );
  }

}

export default UserPanelView
