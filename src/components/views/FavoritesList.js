import React from 'react'
import {Button, Row, Col, Grid, Panel, ButtonToolbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import FaTrash from 'react-icons/lib/fa/trash'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import * as toastr from 'toastr'
import '../App.css'

const FavImage = styled.img`
    max-width: 100%;
    height: 5em;
`
const FavText = styled.p`
    font-weight: bold;
    font-size: 2em;
    color: lightblue;
`

class FavoritesList extends React.Component {

  handleRemoveFromFav = (item) => {
    const user = firebase.auth().currentUser

    if (user) {
      const favId = item.link.split('/').join('')
      firebase.database().ref(
        `/favorites/${firebase.auth().currentUser.uid}/${favId}`
      ).set(this.props.favProducts[favId] = null)
        .then(() => {
          toastr.success('Successfully removed from favorites !')
        }).catch((error) => {
        toastr.error(error.message)
      })
    }
  }

  render() {
    console.log(this.props.favProducts)
    return (
      <Grid>
        <Row>
          <Col>
            <h3>
              Your favorites:
            </h3>
          </Col>
          {(this.props.favProducts !== null) ?
            Object.entries(this.props.favProducts).map(([id, item]) => {
              console.log(id, item)
              return (
                <Panel key={id}>
                  <Grid>
                    <Row>
                      <Col xs={6} md={8} className="text-center col-q">
                        {(('jpg' in item.part) && (item.part.jpg !== null) && (item.part.jpg.length > 0)) ?
                          <FavImage responsive src={item.part.jpg[0]} alt="Picture of part"/>
                          :
                          <FavImage responsive src='http://via.placeholder.com/350?text=No picture available'
                                    alt="Picture of part"/>}
                        <FavText>{item.part.data.name}</FavText>
                      </Col>
                      <Col xs={6} md={4} className="col-q">
                        <div className="btn-center fav-btn ">
                          <ButtonToolbar>
                            <Link to={item.link}>
                              <Button>Details</Button>
                            </Link>
                            <Button
                              onClick={() => this.handleRemoveFromFav(item)}><FaTrash
                              size={25}/></Button>
                          </ButtonToolbar>
                        </div>
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