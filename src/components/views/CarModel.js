import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'

class CarModel extends Component {
    state = {
        items: [],
        engineTypes: [],
        pid: "",
        cid: "",
    }

    componentDidMount() {
        let pid = this.props.match.params.pid
        this.setState({pid})
        let cid = this.props.match.params.cid


        if (cid !== undefined) {
            pid = pid + "/" + cid
        }

        fetch('/api/v2/find/' + pid)
            .then(result => result.json())
            .then(res => {
                const items = res.data
                this.setState({items})
                this.state.items.forEach((item) => {
                    fetch(item.link)
                        .then(result => result.json())
                        .then(
                            res =>
                                this.setState({
                                    engineTypes: [{
                                        item: item, resp: res.data
                                    }].concat(this.state.engineTypes)
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
                        <h2>Select car model and engine type</h2>
                        <ListGroup>

                            {
                                this.state.engineTypes.length ?
                                    this.state.engineTypes.map(
                                        (engineType, n) => (
                                            <ListGroupItem
                                                bsStyle="info"
                                                key={n}
                                            >
                                                {engineType.item.name}
                                                {
                                                    engineType.resp.map(
                                                        (i, m) => {
                                                            const url = '/brands/' + i.link.split('/').slice(-3).join('/')
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
                                    <li> loading... </li>}

                        </ListGroup>
                        <br/>


                    </Col>
                </Grid>
            </div>
        )
    }
}

export default CarModel