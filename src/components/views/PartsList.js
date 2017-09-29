import React, {Component} from 'react'
import {ListGroup, Grid, Col, Row, Button, Panel, Image, Tab, Tabs, Thumbnail} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import FaStar from 'react-icons/lib/fa/star'
import './partslist.css'
import {API_URL} from '../App'
import {connect} from 'react-redux'
import '../App.css'


class PartsList extends Component {
  state = {
    parts: [],
    favorites: [],
    tabKey: 1
  }

  handleTabChange = key => this.setState({tabKey: key})

  handleAddToFav = (item) => {
    const user = firebase.auth().currentUser

    this.state.favorites.push(item)
    if (user) {
      const favId = item.link.split('/').join('')

      firebase.database().ref(
        '/favorites/' + firebase.auth().currentUser.uid + '/' + favId
      ).set(this.state.favorites[favId] ? null : item)
        .then(() => {
          console.log('Added to Firebase')
        }).catch((e) => {
        console.log('Failed:', e)
      })
    }
  }

  componentDidMount() {
    const {manufacturer, model, engineId, partsTypeId, partsId} = this.props.match.params

    fetch(`${API_URL}/api/v2/find/${manufacturer}/${model}/${engineId}/${partsTypeId}/${partsId}`)

      .then(result => result.json())
      .then(res => {
        const parts = res.data
        parts.forEach((item) => {
          fetch(`${API_URL}${item.link}`)
            .then(result => result.json())
            .then(
              res => {
                res.data.link = "/part/" + item.link.split("/").slice(-2).join("/")
                this.setState({
                  parts: [res.data].concat(this.state.parts)
                })
              }
            )
        })
      })
  }

  render() {
    return (
      <div>
        <Grid>
          <Col style={{textAlign: "center"}}>
            <div>
              <Tabs activeKey={this.state.tabKey} id="tab" onSelect={this.handleTabChange}>
                <Tab eventKey={1} title="List">
                  <ListGroup>
                    {
                      this.state.parts.length ?
                        this.state.parts.map(
                          (item, m) => {
                            return (
                              <div key={m}>
                                <Panel>
                                  <Grid>
                                    <Row>
                                      <Col xs={6} md={4}>
                                        <Image responsive src={item.part.jpg[0]}
                                               alt="Picture of part"
                                               className="img-part"/>
                                        <h3>{item.part.data.name}</h3>
                                      </Col>
                                      <Col xs={6} md={8}>
                                        <p>Brand: <span className="text-info">{item.part.data.brand}</span>
                                        </p>
                                        <p>Number: <span className="text-info">{item.part.data.number}</span>
                                        </p>
                                        <p>Status:
                                          <span className="text-warning"
                                                style={{"fontWeight": "bold"}}>{item.part.data.status}</span>
                                        </p>
                                      </Col>
                                      <Col>
                                        <Link to={item.link}>
                                          <Button className="button-product-list">Details</Button>
                                        </Link>
                                        <Button className="button-product-list"
                                                active={!!this.state.favorites[item.link.split('/').join('')]}
                                                onClick={() => this.handleAddToFav(item)}><FaStar
                                          size={20}/></Button>
                                      </Col>
                                    </Row>
                                  </Grid>
                                </Panel>
                              </div>
                            )
                          })
                        :
                        <li>Loading...</li>
                    }
                  </ListGroup>
                </Tab>
                <Tab eventKey={2} title="Grid">
                  <Grid>
                    <Row>
                      {
                        this.state.parts.length ?
                          this.state.parts.map(
                            (item, m) => {
                              return (
                                <Col key={m} xs={6} md={4}>
                                  <Thumbnail src={item.part.jpg[0]} alt="Picture of part">
                                    <h3>{item.part.data.name}</h3>
                                    <p>Brand: <span className="text-info">{item.part.data.brand}</span>
                                    </p>
                                    <p>Number: <span className="text-info">{item.part.data.number}</span>
                                    </p>
                                    <p>Status:
                                      <span className="text-warning"
                                            style={{"fontWeight": "bold"}}>{item.part.data.status}</span>
                                    </p>
                                    <p>
                                      <Link to={item.link}>
                                        <Button className="button-product-list">Details</Button>
                                      </Link>
                                      <Button className="button-product-list"
                                              onClick={() => this.handleAddToFav(item)}><FaStar
                                        size={20}/></Button>
                                    </p>
                                  </Thumbnail>
                                </Col>
                              )
                            })
                          :
                          <li>Loading...</li>
                      }
                    </Row>
                  </Grid>
                </Tab>
              </Tabs>
            </div>
            <br/>

          </Col>
        </Grid>
      </div>
    )
  }
}

export default connect(
  state => ({
    favAdd: state.favs.favorites
  })
)(PartsList)