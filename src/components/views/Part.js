import React, {Component} from 'react'
import * as firebase from 'firebase'
import {Grid, Row, Col, Image, Button} from 'react-bootstrap'
import {API_URL} from '../App'
import FaStar from 'react-icons/lib/fa/star'
import {connect} from 'react-redux'

class Part extends Component {

  state = {
    partData: null
  }

  componentDidMount() {
    const {part, partNum} = this.props.match.params

    fetch(`${API_URL}/api/v2/part/${part}/${partNum}`)
      .then(result => result.json())
      .then(res => {
        const partData = res.data
        this.setState({partData})
      })
  }

  handleAddToFav = () => {
    const user = firebase.auth().currentUser
    const {part, partNum} = this.props.match.params
    this.state.partData.link = `/part/${part}/${partNum}`
    if (user) {
      const favId = this.state.partData.parts[0].link.split('/').slice(-3).join('')
      firebase.database().ref(
        '/favorites/' + firebase.auth().currentUser.uid + '/' + favId
      ).set((this.props.favProducts[favId] ? null : this.state.partData))
        .then(() => {
          console.log('Added/Removed to Firebase')
        }).catch((e) => {
        console.log('Failed:', e)
      })
    }
  }

  render() {
    return (
      <div>
        {
          this.state.partData === null ? <p>Loading…</p> :

            <Grid>
              <Col xs={12} md={4}>
                <Image responsive src={this.state.partData.part.jpg[0]}
                       alt="Picture of part"/>
              </Col>
              <Col xs={12} md={4}>
                <Row>
                  <h3>{this.state.partData.part.data.name}</h3>
                  <h5>About:</h5>
                  <p><span>Brand:</span> {this.state.partData.part.data.brand}
                  </p>
                  <p><span>Number:</span> {this.state.partData.part.data.number}
                  </p>
                  <p><span>Status:</span> {this.state.partData.part.data.status}
                    {console.log("xxx:", this.state.partData.part.properties)}
                  </p>
                  <div><p>Properties:</p>
                    {
                      this.state.partData.part.properties.length ?
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
                        <FaStar color='red' size={20}/> :
                        <FaStar color='black' size={20}/>
                      } Add to favorites
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={4}>
                <Row>
                  <h5>More info:</h5>
                  {
                    this.state.partData.part.more_info.length ?
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
      </div>
    )
  }
}

export default connect(
  state => ({
    favProducts: state.favs.favorites
  })
)(Part)