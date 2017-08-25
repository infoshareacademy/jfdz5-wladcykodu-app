import React from 'react'

import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const MainMenu = () => (
    <div>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>

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

            </Nav>
        </Navbar>
    </div>
)

export default MainMenu