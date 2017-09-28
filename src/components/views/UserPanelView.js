import React from 'react'
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import styled from 'styled-components'
import * as firebase from 'firebase'


const UserFormsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
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
        return console.log("ok")
      }
    }).catch(function (error) {
      return console.log(error)
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
        return console.log("ok")
      }
    }).catch(function (error) {
      return console.log(error)
    })

  }

  render() {
    return (
      <div>
        <h1>User Panel</h1>
        <UserFormsContainer>

          <div>
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
                <FormControl id="formInlineConfirmPassword" type="text" onChange={this.handleConfirmPasswordChange}
                             placeholder="********"/>
              </FormGroup>
              {' '}
              <Button id="change-password-button" onClick={this.changeUserPassword} type="submit"
                      bsStyle="success">
                Save
              </Button>
            </Form>
          </div>


          <div>
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
          </div>

        </UserFormsContainer>
      </div>
    );
  }

}

export default UserPanelView
