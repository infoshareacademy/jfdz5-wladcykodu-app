import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'

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
        const manufacturer = this.props.match.params.manufacturer
        this.setState({manufacturer})
        const model = this.props.match.params.model
        this.setState({model})
        const engineId = this.props.match.params.engineId
        this.setState({engineId})
        const partsTypeId = this.props.match.params.partsTypeId
        this.setState({partsTypeId})
        const partsId = this.props.match.params.partsId
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
                    <Col lg={6} lgPush={3} xs={12} sm={12} md={6} mdPush={3} style={{textAlign: "center"}}>
                        <h2>Select part:</h2>
                        <ListGroup>
                            {
                                this.state.parts.length ?
                                    this.state.parts.map(
                                        item => {
                                            return (
                                                <ListGroupItem bsStyle="info"
                                                               key={item.number}>{item.brand}\ {item.name}: {item.number}
                                                </ListGroupItem>)
                                        })
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