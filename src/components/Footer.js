import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
	background: grey;
	color: white;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`


const Footer = () => (
    <FooterContainer>
        <div>
            <p>Władcy Kodu © 2017</p>
            <img src={require('../images/facebook.svg')} alt=""/>
            <img src={require('../images/twitter.svg')} alt=""/>
            <img src={require('../images/github.svg')} alt=""/>
        </div>
        <div>
            <h4>About us</h4>
            <p>WWW</p>
        </div>
        <div>
            <h4>For users</h4>
            <p>FAQ</p>
        </div>
        <div>
            <p>Władcy Kodu<br/>
                Grunwaldzka Street<br/>
                Gdansk, Poland<br/>
                +48 777 77 77<br/>
                support@wladcykodu.com</p>
        </div>

    </FooterContainer>
)


export default Footer
