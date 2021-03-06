import React, {Component} from 'react'
import {ListGroup, Grid, Col, Row, Button, ButtonToolbar, Panel, Tab, Tabs, Thumbnail} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import * as toastr from 'toastr'
import {FaStar, FaPlusCircle} from 'react-icons/lib/fa'
import './partslist.css'
import {API_URL} from '../App'
import {connect} from 'react-redux'
import '../App.css'
import { add } from '../../state/comparison'
import styled from 'styled-components'
import Spinner from 'react-spinner'

const PartImage = styled.img`
    max-width: 100%;
    height: 5em;
`

class PartsList extends Component {

  state = {
    parts: [],
    tabKey: 1,
    currentPage: 1,
    partsPerPage: 10,
    comparison: this.props.comparisonItems,
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

  handleAddToComparison = (item) => {
    console.log(item)

    if (this.state.comparison.length <= 3) {
      // this.state.comparison.push(item)
      this.props.addToComparison(item)
      this.setState({
        comparison: this.state.comparison.concat([item])
      })
      toastr.success('Successfully add to comparison!')
    } else {
      toastr.error('You are already comparing the maximum number of parts.')
    }
  }


  componentDidMount() {
    let link
    if (typeof(this.props.partslink) !== 'undefined') {
      link = `${API_URL}${this.props.partslink}`
      console.log('link from PartsView: ', link)
    } else {
      const {manufacturer, model, engineId, partsTypeId, partsId} = this.props.match.params
      link = `${API_URL}/api/v2/find/${manufacturer}/${model}/${engineId}/${partsTypeId}/${partsId}`
      console.log('link original: ', link)
    }

    this.setState({isLoading: true})

    fetch(link)

      .then(result => result.json())
      .then(res => {
        const parts = res.data
        return Promise.all(parts.map((item) => {
          return fetch(`${API_URL}${item.link}`)
            .then(result => result.json())
            .then(
              res => {
                res.data.link = "/part/" + item.link.split("/").slice(-2).join("/")
                this.setState({
                  parts: [res.data].concat(this.state.parts),
                })
              })
        }))
      })
      .then(() => this.setState({
        isLoading: false
      }))
      .catch(error => this.setState({
          isLoading: false
        })
      )
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  render() {
    const {parts, currentPage, partsPerPage} = this.state
    const indexOfLastPart = currentPage * partsPerPage
    const indexOfFirstPart = indexOfLastPart - partsPerPage
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(parts.length / partsPerPage); i++) {
      pageNumbers.push(i)
    }
    return (
      <div className="forTabs">
        {this.state.isLoading ?
          <div><Spinner/></div> :
          <Grid>
            <Col style={{textAlign: "center"}}>
              <div>
                <Tabs activeKey={this.state.tabKey} id="tab" onSelect={this.handleTabChange}>
                  <Tab eventKey={1} title="List">
                    <ListGroup>
                      {
                        this.state.parts.length ?
                          this.state.parts.slice(indexOfFirstPart, indexOfLastPart).map(
                            (item, m) => {
                              return (
                                <div key={m}>
                                  <Panel>
                                    <Grid>
                                      <Row>
                                        <Col md={6}>
                                          {(('jpg' in item.part) && (item.part.jpg !== null) && (item.part.jpg.length > 0)) ?
                                            <PartImage responsive src={item.part.jpg[0]} alt="Picture of part"/>
                                            :
                                            <PartImage responsive
                                                       src='http://via.placeholder.com/350?text=No picture available'
                                                       alt="Picture of part"/>}
                                          <h3>{item.part.data.name}</h3>
                                        </Col>
                                        <Col md={6}>
                                          <p>Brand: <span className="text-info">{item.part.data.brand}</span>
                                          </p>
                                          <p>Number: <span className="text-info">{item.part.data.number}</span>
                                          </p>
                                          <p>Status: <span className="text-warning"
                                                           style={{"fontWeight": "bold"}}>{item.part.data.status}</span>
                                          </p>
                                          <ButtonToolbar>
                                            <Button className="button-product-list">
                                              <Link to={item.link}>
                                                Details
                                              </Link>
                                            </Button>

                                            <Button
                                              active={!!this.props.favProducts[item.link.split('/').join('')]}
                                              onClick={() => this.handleAddToFav(item)}>
                                              {this.props.favProducts[item.link.split('/').join('')] ?
                                                <FaStar color='red' size={20}/> :
                                                <FaStar color='black' size={20}/>
                                              }
                                            </Button>
                                            <Button
                                              onClick={() => this.handleAddToComparison(item)}>Comparison <FaPlusCircle
                                              size={20}/></Button>
                                          </ButtonToolbar>
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
                                      <p>Status: <span className="text-warning"
                                                       style={{"fontWeight": "bold"}}>{item.part.data.status}</span></p>
                                      <ButtonToolbar>
                                        <Button className="button-product-list">
                                          <Link to={item.link}>
                                            Details
                                          </Link>
                                        </Button>

                                        <Button
                                          active={!!this.props.favProducts[item.link.split('/').join('')]}
                                          onClick={() => this.handleAddToFav(item)}>
                                          {this.props.favProducts[item.link.split('/').join('')] ?
                                            <FaStar color='red' size={20}/> :
                                            <FaStar color='black' size={20}/>
                                          }
                                        </Button>
                                        <Button
                                          onClick={() => this.handleAddToComparison(item)}>Comparison <FaPlusCircle
                                          size={20}/></Button>
                                      </ButtonToolbar>
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
            <div className="pagination">
              {pageNumbers.map(number => {
                return (
                  <a key={number} id={number} onClick={this.handleClick.bind(this)}>
                    {number}
                  </a>
                )
              })}
            </div>
          </Grid>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addToComparison:  comparePart => dispatch(add(comparePart))
})

export default connect(
  state => ({
    favProducts: state.favs.favorites,
    comparisonItems: state.compareParts.comparison
  }),
  mapDispatchToProps
)(PartsList)