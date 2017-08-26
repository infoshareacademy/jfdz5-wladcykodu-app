import React from 'react'

import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const MainMenu = () => (
    <div>

       <Navbar inverse>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">
                        <img src={require('../images/logo-image.png')} />
                    </a>
                    <a href="#">
                        <img src={require('../images/logo-name.png')} alt="" />
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer exact to="/">
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <img src={'C:\\Users\\ajemi\\WebstormProjects\\jfdz5-wladcykodu-app\\src\\images\\logo.png'} />
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
               <LinkContainer to="#">
                   <NavItem>Log Out</NavItem>
               </LinkContainer>
           </Nav>
        </Navbar>
    </div>
)

export default MainMenu