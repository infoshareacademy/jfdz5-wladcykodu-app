import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const MainMenu = () => (
    <div>
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
                <LinkContainer to="/makes">
                    <NavItem>Brands</NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                <LinkContainer to="#">
                    <NavItem>Log Out</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    </div>
)
export default MainMenu
