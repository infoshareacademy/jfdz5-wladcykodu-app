import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class PartCategory extends Component {
    state = {
        partsCat: [],
        partsTypes: [],
        manufacturer: '',
        model: '',
        engineId: ''
    }

    componentDidMount() {
        const manufacturer = this.props.match.params.manufacturer
        this.setState({manufacturer})
        const model = this.props.match.params.model
        this.setState({model})
        const engineId = this.props.match.params.engineId
        this.setState({engineId})


        fetch(`/api/v2/find/${manufacturer}/${model}/${engineId}`)
            .then(result => result.json())
            .then(res => {
                const partsCat = res.data
                this.setState({partsCat})
                this.state.partsCat.forEach((item) => {
                    fetch(item.link)
                        .then(result => result.json())
                        .then(
                            res =>
                                this.setState({
                                    partsTypes: [{
                                        item: item, resp: res.data
                                    }].concat(this.state.partsTypes)
                                })
                        )
                })
            })
    }

    render() {
        return (

            <div>
                <Grid>
                    <Col lg={6} lgPush={3} xs={12} sm={12} md={6} mdPush={3} style={{textAlign: "center"}}>
                        <h2>Select category from list below:</h2>
                        <ListGroup>
                            {
                                this.state.partsTypes.length ?
                                    this.state.partsTypes.map(
                                        (partsType, n) => (
                                            <ListGroupItem
                                                bsStyle="info"
                                                key={n}
                                            >
                                                {partsType.item.name}
                                                {
                                                    partsType.resp.map(
                                                        (i, m) => {
                                                            const url = '/brands/' + i.link.split('/').slice(-4).join('/')
                                                            return (
                                                                <ListGroupItem
                                                                    bsStyle="success"
                                                                    key={m}
                                                                >
                                                                    <Link to={url}>{i.name}</Link>
                                                                </ListGroupItem>
                                                            )
                                                        }
                                                    )
                                                }
                                            </ListGroupItem>)) :
                                    <li>Loading...</li>}
                        </ListGroup>
                        <br/>

                    </Col>
                </Grid>
            </div>
        )
    }
}

export default PartCategory