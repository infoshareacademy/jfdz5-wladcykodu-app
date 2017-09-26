import React from 'react'
import {Button, Row, Col, Grid, Panel, ButtonToolbar} from 'react-bootstrap'
import * as firebase from 'firebase'
import styled from 'styled-components'
import FaTrash from 'react-icons/lib/fa/trash'
import {connect} from 'react-redux'
import {addFav} from '../../state/favs'

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
    firebase.database().ref('/favorites').child(user.uid).child('/part').once('value')
      .then((snapshot) => {
          console.log('Data from Firebase:', snapshot.val())
          addFav(snapshot.val())
        }
      )
  }

  handleRemoveFromFav() {
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
                        <FavImage className="image-size" responsive src={item.part.jpg[0]}/>
                        {/*   TODO handle case when no picture is added*/}
                        <FavText>{item.part.data.name}</FavText>
                      </Col>
                      <Col xs={6} md={4}>
                        <ButtonToolbar>
                          <Button>Details</Button>
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

const mapDispatchToProps = dispatch => ({
  addToFav: (favId) => dispatch(addFav(favId))
})

export default connect(
  null,
  mapDispatchToProps,
)(FavoritesList)