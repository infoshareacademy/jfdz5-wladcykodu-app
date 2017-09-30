import React from 'react'
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'
import {FaStar, FaPlusCircle} from 'react-icons/lib/fa'
import './MainMenu.css'
import styled from 'styled-components'
import * as firebase from 'firebase'
import * as toastr from 'toastr'
import './App.css'
import FaUser from 'react-icons/lib/fa/user'
import { add } from '../state/comparision'

const MenuCntainer = styled.div`
	background: black;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 1;
`

class MainMenu extends React.Component {

  state = {
    comparison: [],
    favorites: []
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
          <LinkContainer className="brand-logo" to="/">
            <img src={require('../images/logo-image.png')} alt="logo of auto parts app"/>
          </LinkContainer>
          <LinkContainer className="brand-name" to="/">
            <img src={require('../images/logo-name.png')} alt="logo of auto parts app"/>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1}>
            <LinkContainer exact to="/">
              <NavItem>Home</NavItem>
            </LinkContainer>
          </NavItem>
          <NavItem eventKey={2}>
            <LinkContainer to="/favorites">
              <NavItem>
                Favorites
                { (this.state.favorites !== null && this.state.favorites.length >= 1) ? <FaStar size={15}/> : null }
              </NavItem>
            </LinkContainer>
          </NavItem>
          <NavItem eventKey={3}>
            <LinkContainer to="/comparison">
              <NavItem>
                Comparison
                { (this.state.comparison !== null && this.state.comparison.length >= 1) ? <FaPlusCircle size={15}/> : null }
              </NavItem>
            </LinkContainer>
          </NavItem>
          <NavItem eventKey={4}>
            <LinkContainer to="/contact">
              <NavItem>Contact</NavItem>
            </LinkContainer>
          </NavItem>
          <NavItem className="hidden-on-mobile" eventKey={6}>
            <LinkContainer to="/userpanel">
              <NavItem>User Panel</NavItem>
            </LinkContainer>
          </NavItem>
          <NavItem className="hidden-on-mobile sign-out" eventKey={7}>
            <LinkContainer to="/signin">
              <NavItem onClick={this.signOutUser}>Sign Out</NavItem>
            </LinkContainer>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown className="hidden-on-mobile" eventKey={5} title={<FaUser size={25}/>} id="basic-nav-dropdown">
            <MenuItem eventKey={5.1}>
              <LinkContainer to="/userpanel">
                <NavItem>User Panel</NavItem>
              </LinkContainer>
            </MenuItem>
            <MenuItem className="sign-out" eventKey={5.2}>
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

const mapDispatchToProps = dispatch => ({
  addToComparision:  comparePart => dispatch(add(comparePart))
})

export default connect(
      state => ({
        favProducts: state.favs.favorites
      }),
  mapDispatchToProps
)(MainMenu)