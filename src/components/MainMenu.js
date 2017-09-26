import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import styled from 'styled-components'
import * as firebase from 'firebase'
import * as toastr from 'toastr'
import './App.css'

const MenuCntainer = styled.div`
	background: black
`

class MainMenu extends React.Component {

  signOutUser = () => {
    firebase.auth().signOut().then(() => {
      toastr.success('Sign out successfully')
    }).catch(error => {
      toastr.error(error.message)
    })
  }

  render() {
    return (
      <MenuCntainer>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer exact to="/">
                <img src={require('../images/logo-image.png')} alt="logo of auto parts app"/>
              </LinkContainer>
              <LinkContainer exact to="/">
                <img src={require('../images/logo-name.png')} alt="logo of auto parts app"/>
              </LinkContainer>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer exact to="/">
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/favorites">
              <NavItem>Favorites</NavItem>
            </LinkContainer>
            <LinkContainer to="/userpanel">
              <NavItem>User Panel</NavItem>
            </LinkContainer>
            <LinkContainer to="/comparision">
              <NavItem>Comparision</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/signin">
              <NavItem onClick={this.signOutUser}>Sign Out</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
      </MenuCntainer>
    )
  }
}

export default MainMenu