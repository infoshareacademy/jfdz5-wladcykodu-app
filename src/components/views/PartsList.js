import React, {Component} from 'react'
import {ListGroup, Grid, Col, Row, Button, Panel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import FaStar from 'react-icons/lib/fa/star'

class PartsList extends Component {
    state = {
        parts: [],
        manufacturer: '',
        model: '',
        engineId: '',
        partsTypeId: '',
        partsId: ''
    }

    componentDidMount() {
        const {manufacturer, model, engineId, partsTypeId, partsId} = this.props.match.params
        this.setState({manufacturer})
        this.setState({model})
        this.setState({engineId})
        this.setState({partsTypeId})
        this.setState({partsId})

        fetch(`/api/v2/find/${manufacturer}/${model}/${engineId}/${partsTypeId}/${partsId}`)

            .then(result => result.json())
            .then(res => {
                const parts = res.data
                this.setState({parts})
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
                                                                <Col>
                                                                    <h3>{item.name}</h3>
                                                                </Col>
                                                                <Col>
                                                                    <p>Brand: <span
                                                                        className="text-info">{item.brand}</span></p>
                                                                    <p>Number: <span
                                                                        className="text-info">{item.number}</span></p>
                                                                    <p>Status: <span className="text-warning"
                                                                                     style={{"fontWeight": "bold"}}>
                                                                    {item.status}</span>
                                                                    </p>
                                                                </Col>
                                                                <Col>
                                                                    {item.has_children === true ?
                                                                        <Link
                                                                            to={`/part/${item.link.split('/').slice(-4).join('/')}`}>
                                                                            <Button>Details</Button>
                                                                        </Link> :
                                                                        <Link
                                                                            to={`/part/${item.link.split('/').slice(-2).join('/')}`}>
                                                                            <Button>Details</Button> </Link>}
                                                                    <Button><FaStar size={20}/></Button>
                                                                </Col>
                                                            </Row>
                                                        </Grid>
                                                    </Panel>
                                                </div>
                                            )
                                        }
                                    )
                                    : <li>Loading...</li>
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