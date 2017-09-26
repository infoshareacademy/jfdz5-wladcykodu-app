import React from 'react'
import * as firebase from 'firebase'
import styled from 'styled-components'
import {Button, Row, Col, Grid, Panel, ButtonToolbar} from 'react-bootstrap'


const ComparisionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`

const CompareImage = styled.img`
    max-width: 100%;
    width: 8em;
    height: auto;
`
const CompareText = styled.p`
    font-weight: bold;
    font-size: 2em;
    color: black;
`


class ComparisionView extends React.Component {
  state = {
    comparison: []
  }

  componentWillMount() {
    const user = firebase.auth().currentUser
    firebase.database().ref('/users').child(user.uid).child('comparision:/').once('value')
      .then((snapshot) => {
        this.setState({
            comparision: snapshot.val()
          }
        )
      })
  }


  render() {
    return (
        <ComparisionContainer>
            <h3>Comparision</h3>

        </ComparisionContainer>
    );
  }

}

export default ComparisionView
