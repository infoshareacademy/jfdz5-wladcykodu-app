import React from 'react'
import {Button, Row, Col, Grid, Panel, ButtonToolbar} from 'react-bootstrap'
import * as firebase from 'firebase'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import FaTrash from 'react-icons/lib/fa/trash'
import {connect} from 'react-redux'

const FavImage = styled.img`
    max-width: 100%;
    width: 8em;
    height: auto;
`
const FavText = styled.p`
    font-weight: bold;
    font-size: 2em;
    color: lightblue;
`

class FavoritesList extends React.Component {
  state = {
    favorites: []
  }

  componentWillMount() {
    const user = firebase.auth().currentUser
    firebase.database().ref('/favorites').child(user.uid).once('value')
      .then((snapshot) => {
          console.log('Object.entries :', Object.entries(snapshot.val()))
          console.log('Data from Firebase :', snapshot.val())
          console.log("before", this.state.favorites)
          this.setState({
            favorites: Object.entries(snapshot.val())
          })
          console.log("after", this.state.favorites)
        }
      )
  }

  handleRemoveFromFav(item) {
    // TODO : remove item from favorites (also in Firebase)
  }

  render() {
    return (
      <Grid>
        <Row className="text-center">
          <Col>
            <h3>
              Your favorites:
            </h3>
          </Col>
          {(this.state.favorites !== null) ?
            this.state.favorites.map((item, id) => {
              return (
                <Panel key={id}>
                  <Grid>
                    <Row>
                      <Col xs={6} md={8} className="text-center">
                        <FavImage className="image-size" responsive src={item[1].part.jpg[0]}/>
                        {/*   TODO handle case when no picture is added*/}
                        <FavText>{item[1].part.data.name}</FavText>
                      </Col>
                      <Col xs={6} md={4}>
                        <ButtonToolbar>
                          <Link to={item[1].link}>
                            <Button>Details</Button>
                          </Link>
                          <Button
                            onClick={this.handleRemoveFromFav}><FaTrash
                            size={20}/></Button>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                  </Grid>
                </Panel>
              )
            })
            : <h3>You haven't added any part to favorites list yet</h3>
          }
        </Row>
      </Grid>
    )
  }
}

export default connect(
  state => ({
    favProducts: state.favs.favorites
  })
)(FavoritesList)