import React, {Component} from 'react'
import {ListGroup, Grid, Col, Row, Button, Panel, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase'
import FaStar from 'react-icons/lib/fa/star'
import './partslist.css'

class PartsList extends Component {
    state = {
        parts: [],
        favorites: []
    }

    handleAddToFav = (item) => {
        const user = firebase.auth().currentUser

        this.state.favorites.push(item)
        if (user) {
            firebase.database().ref('/users').child(user.uid).child('favorites:/').set(this.state.favorites)
                .then(() => {
                    console.log('Added to Firebase')
                }).catch((e) => {
                console.log('Failed:', e)
            })
        }
    }

    componentDidMount() {
        const {manufacturer, model, engineId, partsTypeId, partsId} = this.props.match.params

        fetch(`/api/v2/find/${manufacturer}/${model}/${engineId}/${partsTypeId}/${partsId}`)

            .then(result => result.json())
            .then(res => {
                const parts = res.data
                parts.forEach((item) => {
                    fetch(item.link)
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
                        <h2>Select part:</h2>
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
                                                                    <p>Brand: <span
                                                                        className="text-info">{item.part.data.brand}</span>
                                                                    </p>
                                                                    <p>Number: <span
                                                                        className="text-info">{item.part.data.number}</span>
                                                                    </p>
                                                                    <p>Status: <span className="text-warning"
                                                                                     style={{"fontWeight": "bold"}}>
                                                                    {item.part.data.status}</span>
                                                                    </p>
                                                                </Col>
                                                                <Col>
                                                                    <Link to={item.link}>
                                                                        <Button>Details</Button> </Link>
                                                                    <Button
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
                        <br/>

                    </Col>
                </Grid>
            </div>
        )
    }
}

export default PartsList