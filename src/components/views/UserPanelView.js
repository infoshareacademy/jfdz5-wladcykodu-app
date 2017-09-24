import React from 'react'
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import styled from 'styled-components'

const UserFormsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`

const UserPanelView = () => (
  <div>
    <h1>User Panel</h1>
    <UserFormsContainer>

      <div>
        <h3>Change password</h3>
        <Form horizontal>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Current password</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="Jane Doe"/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>New password</ControlLabel>
            {' '}
            <FormControl type="email" placeholder="jane.doe@example.com"/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Confirm new password</ControlLabel>
            {' '}
            <FormControl type="email" placeholder="jane.doe@example.com"/>
          </FormGroup>
          {' '}
          <Button type="submit" bsStyle="success">
            Save
          </Button>
        </Form>
      </div>

      <div>
        <h3>Change e-mail</h3>
        <Form horizontal>
          <FormGroup controlId="formInlineName">
            <ControlLabel>New e-mail</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="Jane Doe"/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Enter the password</ControlLabel>
            {' '}
            <FormControl type="email" placeholder="jane.doe@example.com"/>
          </FormGroup>
          {' '}
          <Button type="submit" bsStyle="success">
            Save
          </Button>
        </Form>
      </div>

    </UserFormsContainer>
  </div>
)

export default UserPanelView
