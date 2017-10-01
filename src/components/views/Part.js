import React, {Component} from 'react'
import * as firebase from 'firebase'
import {Grid, Row, Col, Image, Button, ButtonToolbar} from 'react-bootstrap'
import {API_URL} from '../App'
import FaStar from 'react-icons/lib/fa/star'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import FaFacebook from 'react-icons/lib/fa/facebook'
import {ShareButtons} from 'react-share'
import Spinner from 'react-spinner'

class Part extends Component {

  state = {
    partData: null
  }

  fetchPartData(part, partNum) {
    fetch(`${API_URL}/api/v2/part/${part}/${partNum}`)
      .then(result => result.json())
      .then(res => {
        const partData = res.data
        this.setState({partData})
        window.scrollTo(0, 0)
      })
  }

  componentDidMount() {
    const {part, partNum} = this.props.match.params

    this.fetchPartData(part, partNum)
  }

  handleAddToFav = () => {
    const user = firebase.auth().currentUser
    const {part, partNum} = this.props.match.params
    let fav = {}
    for (let key in this.state.partData) fav[key] = this.state.partData[key]
    fav.link = `/part/${part}/${partNum}`

    if (user) {
      const favId = this.state.partData.parts[0].link.split('/').slice(-3).join('')
      firebase.database().ref(
        `/favorites/${firebase.auth().currentUser.uid}/${favId}`
      ).set((this.props.favProducts[favId] ? null : fav))
        .then(() => {
          console.log('Added/Removed to Firebase')
        }).catch((e) => {
        console.log('Failed:', e)
      })
    }
  }


  render() {
    const URL_FOR_SHARE = 'http://app.wk.jfdz5.is-academy.pl/' + window.location.pathname
    const title = "Amazing  AutoParts search app - find what you're looking for!"
    const {FacebookShareButton} = ShareButtons

    return (
      <div>
        {
          this.state.partData === null ? <Spinner/> :

            <Grid>
              <Col xs={12} md={4}>
                {(('jpg' in this.state.partData.part) && (this.state.partData.part.jpg !== null) && (this.state.partData.part.jpg.length > 0)) ?
                  <Image responsive src={this.state.partData.part.jpg[0]}
                         alt="Picture of part"/>
                  :
                  <Image responsive src='http://via.placeholder.com/350?text=No picture available'
                         alt="Picture of part"/>}
              </Col>
              <Col xs={12} md={4}>
                <Row>
                  <h3>{this.state.partData.part.data.name}</h3>
                  <p><span className="prop">Brand: </span><span className="text-info">{this.state.partData.part.data.brand}</span>
                  </p>
                  <p><span className="prop">Number: </span><span className="text-info"> {this.state.partData.part.data.number}</span>
                  </p>
                  <p><span className="prop">Status: </span><span className="text-warning"
                                   style={{"fontWeight": "bold"}}>{this.state.partData.part.data.status}</span>
                  </p>
                  <div><span className="prop"> Properties:</span>
                    {
                      (('properties' in this.state.partData.part) && (this.state.partData.part.properties !== null) && (this.state.partData.part.properties.length)) ?
                        this.state.partData.part.properties.map(
                          (item, m) => {
                            return (
                              <div key={m}>
                                <Grid>
                                  <Row>
                                    <Col xs={6} md={8}>
                                      <ul>
                                        <li>
                                          {item.key} : {item.value}
                                        </li>
                                      </ul>
                                    </Col>
                                  </Row>
                                </Grid>
                              </div>
                            )
                          })
                        : <p>No properties for this product, ask distributor for more info.</p>
                    }
                  </div>
                </Row>
                <Row>
                  <Col>
                    <Button
                      active={!!this.props.favProducts[this.state.partData.parts[0].link.split('/').slice(-3).join('')]}
                      onClick={() => this.handleAddToFav(this.state.partData)}>
                      {this.props.favProducts[this.state.partData.parts[0].link.split('/').slice(-3).join('')] ?
                        'Remove from favorites ' : 'Add to favorites '}
                      {this.props.favProducts[this.state.partData.parts[0].link.split('/').slice(-3).join('')] ?
                        <FaStar color='red' size={20}/> :
                        <FaStar color='black' size={20}/>
                      }
                    </Button>
                    <FacebookShareButton
                      url={URL_FOR_SHARE}
                      quote={title}>
                      <Button className="login-btn">
                        Share on <FaFacebook size={22}/></Button>
                    </FacebookShareButton>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={4}>
                <Row>{console.log(this.state.partData.part)}{console.log(this.state.partData.parts[0].name)}
                  <h5><span className="prop">More info: </span></h5>
                  {
                    (('more_info' in this.state.partData.part) && (this.state.partData.part.more_info !== null) && (this.state.partData.part.more_info.length)) ?
                      this.state.partData.part.more_info.map(
                        (item, m) => {
                          return (
                            <div key={m}>
                              <li>{item}</li>
                            </div>
                          )
                        })
                      :
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  }
                </Row>
              </Col>

            </Grid>

        }

        {
          this.state.partData === null ? <Spinner/> :
            <Grid>
              <Col xs={12} md={12}>
                <Row>
                  <h3 className="more-info-title">More matching products that might interest you:</h3>
                  {
                    this.state.partData.parts.length ?
                      this.state.partData.parts.slice(1, this.state.partData.parts.length).map(
                        (item, m) => {
                          return (
                            <Col key={m} xs={6} md={3} className="thumbnail-2-wrapper">

                              <div className="thumbnail-2">
                                <h4>{item.name}</h4>
                                <p>Brand: <span className="text-info">{item.brand}</span>
                                </p>
                                <p>Number: <span className="text-info">{item.number}</span>
                                </p>
                                <p>Status: <span className="text-warning"
                                                 style={{"fontWeight": "bold"}}>{item.status}</span>
                                </p>
                                <ButtonToolbar>
                                  <Button
                                    onClick={() => this.fetchPartData(item.link.split('/').slice(-2)[0], item.link.split('/').slice(-2)[1])}
                                    className="button-product-list">
                                    <Link to={`/${item.link.split('/').slice(-3).join('/')}/#`}>
                                      Details
                                    </Link>
                                  </Button>
                                </ButtonToolbar>
                              </div>

                            </Col>
                          )
                        })
                      :
                      <p>No similar products...</p>
                  }
                </Row>
              </Col>
            </Grid>}
      </div>
    )
  }
}

export default connect(
  state => ({
    favProducts: state.favs.favorites
  })
)(Part)