import React, {Component} from 'react'
import {Grid, Row, Col, Image, Button} from 'react-bootstrap'
import {API_URL} from '../App'
import FaStar from 'react-icons/lib/fa/star'

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
                        : <p>No data for this product, ask distributor for more info.</p>
                    }
                  </div>
                </Row>
                <Row>
                  <Col>
                    <Button><FaStar size={20}/> Add to favorites</Button>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={4}>
                <Row>
                  <h5>Description:</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.</p>
                </Row>
              </Col>
            </Grid>
        }
      </div>
    )
  }
}

export default Part