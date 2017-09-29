import React from 'react'
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'
import styled from 'styled-components'
import * as firebase from 'firebase'
import * as toastr from 'toastr'
import './App.css'
import FaUser from 'react-icons/lib/fa/user'

const MenuCntainer = styled.div`
	background: black
`

class MainMenu extends React.Component {

  state = {
    comparision: []
  }
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
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer exact to="/">
                <img src={require('../images/logo-image.png')} alt="logo of auto parts app"/>
              </LinkContainer>
              <LinkContainer exact to="/">
                <img src={require('../images/logo-name.png')} alt="logo of auto parts app"/>
              </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}>
                <LinkContainer to="/brands/:manufacturer">
                  <NavItem>Home</NavItem>
                </LinkContainer>
              </NavItem>
              <NavItem eventKey={2} href="/favorites">
                <LinkContainer to="/favorites">
                  <NavItem>Favorites</NavItem>
                </LinkContainer>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown eventKey={3} title={<FaUser size={25}/>} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>
                  <LinkContainer to="/userpanel">
                    <NavItem>User Panel</NavItem>
                  </LinkContainer>
                </MenuItem>
                <MenuItem eventKey={3.2} href="/singin">
                  <LinkContainer to="/signin">
                    <NavItem onClick={this.signOutUser}>Sign Out</NavItem>
                  </LinkContainer>
                </MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </MenuCntainer>
    )
  }
}


export default connect(
  null
)(MainMenu)