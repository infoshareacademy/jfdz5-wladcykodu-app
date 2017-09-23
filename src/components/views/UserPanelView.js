import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import styled from 'styled-components'
import * as firebase from 'firebase'

import {authUser} from '../../state/user'

const UserFormsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;


class UserPanelView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            newEmail: '',
            newPassword: '',
            conformNewPassword: '',
            error: '',
            handlePasswordChange: function(event) {
                this.setState({newPassword: event.target.value});
            },
            handleConfirmPassword: function(event) {
                this.setState({conformNewPassword: event.target.value});
            }
        }
    }

    changeUserPassword = (event) => {

        const user = firebase.auth().currentUser;


        document.getElementById("change-password-button").addEventListener("click", function(event){
            event.preventDefault();
            this.handlePasswordChange();
            this.handleConfirmPassword();
            user.updatePassword(this.newPassword).then(function () {
                if (this.newPassword === this.confirmPassword) {
                    return console.log("ok")
                }

            })

        });

    }






        render() {
            return (
                <div>
                    <h1>User Panel</h1>
                    <UserFormsContainer>

                        <div>
                            <h3>Change password</h3>
                            <Form horizontal>
{/*                                <FormGroup controlId="formInlineName">
                                    <ControlLabel>Current password</ControlLabel>
                                    {' '}
                                    <FormControl id="currentPassword" type="password" placeholder="********"/>
                                </FormGroup>*/}
                                {' '}
                                <FormGroup controlId="formInlineEmail">
                                    <ControlLabel>New password</ControlLabel>
                                    {' '}
                                    <FormControl id="newPassword" type="password" onChange={this.handlePasswordChange} placeholder="********"/>
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formInlineEmail">
                                    <ControlLabel>Confirm new password</ControlLabel>
                                    {' '}
                                    <FormControl id="confirmPassword" type="password" placeholder="********"/>
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
                                <FormGroup controlId="formInlineName">
                                    <ControlLabel>New e-mail</ControlLabel>
                                    {' '}
                                    <FormControl type="email" placeholder="jane@example.com"/>
                                </FormGroup>
                                {' '}
                                <FormGroup controlId="formInlineEmail">
                                    <ControlLabel>Confirm new e-mail</ControlLabel>
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
            );
        }

}

/*const UserPanelView = () => {

    const changeUserPassword = (event) => {
        event.preventDefault()
            var user = firebase.auth().currentUser;
            var password = user.password;
            var currentPassword = document.getElementById("current-password").val();
            var newPassword = document.getElementById("new-password").val();
            var confirmPassword = document.getElementById("confirm-password").val();

            user.updatePassword(newPassword).then(function() {
                if(password === currentPassword && newPassword === confirmPassword) {
                    return console.log("authUser")
                }
            }).catch(function(error) {
                console.log("bad")
            });
    };

    return (
        <div>
            <h1>User Panel</h1>
            <UserFormsContainer>

                <div>
                    <h3>Change password</h3>
                    <Form horizontal>
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>Current password</ControlLabel>
                            {' '}
                            <FormControl id="current-password" type="password" placeholder="********" />
                        </FormGroup>
                        {' '}
                        <FormGroup controlId="formInlineEmail">
                            <ControlLabel>New password</ControlLabel>
                            {' '}
                            <FormControl id="new=password" type="password" placeholder="********" />
                        </FormGroup>
                        {' '}
                        <FormGroup controlId="formInlineEmail">
                            <ControlLabel>Confirm new password</ControlLabel>
                            {' '}
                            <FormControl id="confirm-password" type="password" placeholder="********" />
                        </FormGroup>
                        {' '}
                        <Button id="change-password-button" onClick={changeUserPassword} type="submit" bsStyle="success">
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
                            <FormControl type="email" placeholder="jane@example.com" />
                        </FormGroup>
                        {' '}
                        <FormGroup controlId="formInlineEmail">
                            <ControlLabel>Confirm new e-mail</ControlLabel>
                            {' '}
                            <FormControl type="email" placeholder="jane.doe@example.com" />
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
}*/



export default UserPanelView
