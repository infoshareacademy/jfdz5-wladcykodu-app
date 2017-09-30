import React, {Component} from 'react'
import {ListGroup, Grid, Col, Row, Button, Panel, Tab, Tabs, Thumbnail} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import FaStar from 'react-icons/lib/fa/star'
import './partslist.css'
import {API_URL} from '../App'
import {connect} from 'react-redux'
import '../App.css'
import styled from 'styled-components'

const PartImage = styled.img`
    max-width: 100%;
    height: 5em;
`

class PartsList extends Component {
  state = {
    parts: [],
    tabKey: 1
  }

  handleTabChange = key => this.setState({tabKey: key})

  handleAddToFav = (item) => {
    const user = firebase.auth().currentUser

    if (user) {
      const favId = item.link.split('/').join('')

      firebase.database().ref(
        '/favorites/' + firebase.auth().currentUser.uid + '/' + favId
      ).set(this.props.favProducts[favId] ? null : item)
        .then(() => {
          console.log('Added/Removed to Firebase')
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
                                        {(('jpg' in item.part) && (item.part.jpg !== null) && (item.part.jpg.length > 0)) ?
                                          <PartImage responsive src={item.part.jpg[0]} alt="Picture of part"/>
                                          :
                                          <PartImage responsive
                                                     src='http://via.placeholder.com/350?text=No picture available'
                                                     alt="Picture of part"/>}
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
                                        <Button
                                          active={!!this.props.favProducts[item.link.split('/').join('')]}
                                          onClick={() => this.handleAddToFav(item)}>
                                          {this.props.favProducts[item.link.split('/').join('')] ?
                                            <FaStar color='red' size={20}/> :
                                            <FaStar color='black' size={20}/>
                                          }
                                        </Button>
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
                                  <Thumbnail
                                    src={(('jpg' in item.part) && (item.part.jpg !== null) && (item.part.jpg.length > 0)) ? item.part.jpg[0] : 'http://via.placeholder.com/350?text=No picture available'}
                                    alt="Picture of part">
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
                                      <Button
                                        active={!!this.props.favProducts[item.link.split('/').join('')]}
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
    favProducts: state.favs.favorites
  })
)(PartsList)