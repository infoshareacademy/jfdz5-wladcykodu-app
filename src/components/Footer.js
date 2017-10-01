import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import styled from 'styled-components'
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square'
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square'
import FaGithubSquare from 'react-icons/lib/fa/github-square'

const FooterContainer = styled.div`
	background: black;
	color: lightgrey;
	font-size: 10px;
	padding: 25px;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

class Footer extends React.Component {

  render() {
    return (
      <FooterContainer id="footer">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} sm={6} md={6} lg={3} className="footer-element">
              <h5 className="footer-element">Władcy Kodu © 2017</h5>
              <div className="footer-element">
                <a href="https://www.facebook.com/">
                  <FaFacebookSquare className="footer-social-link" size={27} color={"lightgrey"}/>
                </a>
                <a href="https://twitter.com/">
                  <FaTwitterSquare className="footer-social-link" size={27} color={"lightgrey"}/>
                </a>
                <a href="https://github.com/orgs/infoshareacademy/teams/wladcykodu/repositories">
                  <FaGithubSquare className="footer-social-link" size={27} color={"lightgrey"}/>
                </a>
              </div>
            </Col>
            <Col xsHidden smHidden mdHidden lg={3} className="footer-element">
              <div className="footer-element">
                <h5>About us</h5>
                <p>WWW</p>
              </div>
            </Col>
            <Col xsHidden smHidden mdHidden lg={3} className="footer-element">
              <div className="footer-element">
                <h5>For users</h5>
                <p>FAQ</p>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} className="footer-element">
              <h6 className="footer-element footer-address">Władcy Kodu<br/>
                Grunwaldzka Street, Gdansk, Poland<br/>
                +48 777 77 77, support@wladcykodu.com</h6>
            </Col>
          </Row>
        </Grid>
      </FooterContainer>
    )
  }
}

/*const Footer = () => (

  <FooterContainer>
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={3}>
          <h5>Władcy Kodu © 2017</h5>
          <FaFacebookSquare size={30}/>
          <FaTwitterSquare size={30}/>
          <FaGithubSquare size={30}/>
        </Col>
        <Col xs={12} md={3}>
          <h5>About us</h5>
          <p>WWW</p>
        </Col>
        <Col xs={12} md={3}>
          <h5>For users</h5>
          <p>FAQ</p>
        </Col>
        <Col xs={12} md={3}>
          <p>Władcy Kodu<br/>
            Grunwaldzka Street, Gdansk, Poland<br/>
            +48 777 77 77<br/>
            support@wladcykodu.com</p>
        </Col>
      </Row>
    </Grid>
  </FooterContainer>
)*/


export default Footer
