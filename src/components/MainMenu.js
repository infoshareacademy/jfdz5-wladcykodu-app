import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import styled from 'styled-components'
import * as firebase from 'firebase'


const MenuCntainer = styled.div`
	background: black
`

const MainMenu = () => (
    <MenuCntainer>
        <Navbar inverse>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">
                        <img src={require('../images/logo-image.png')} alt="logo of auto parts app"/>
                    </a>
                    <a href="/">
                        <img src={require('../images/logo-name.png')} alt="logo of auto parts app"/>
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer exact to="/">
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/signin">
                    <NavItem>Sign In</NavItem>
                </LinkContainer>
                <LinkContainer to="/signup">
                    <NavItem>Sign Up</NavItem>
                </LinkContainer>
                <LinkContainer to="/userpanel">
                    <NavItem>User Panel</NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                <LinkContainer to="/signout">
                    <NavItem onClick={() => firebase.auth().signOut()}>Sign Out</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    </MenuCntainer>
)
export default MainMenu
