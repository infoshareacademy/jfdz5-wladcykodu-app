import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

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
                                                <ListGroupItem
                                                    bsStyle="success"
                                                    key={m}
                                                >
                                                    {item.has_children === true ?
                                                        <Link
                                                            to={`/part/${item.link.split('/').slice(-4).join('/')}`}>{item.name}</Link> :
                                                        <Link
                                                            to={`/part/${item.link.split('/').slice(-2).join('/')}`}>{item.brand}\ {item.name}: {item.number}</Link>}
                                                </ListGroupItem>
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