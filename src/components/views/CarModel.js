import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'

class CarModel extends Component {
    state = {
        items: [],
        engineType: [],
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
                        .then(res => {
                            let engine = {item: item, resp: res.data}
                            let engineType = [engine]
                            engineType = engineType.concat(this.state.engineType.slice())
                            this.setState({engineType})
                            console.log(this.state.engineType.length)
                        })
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

                            {this.state.engineType.length ?
                                this.state.engineType.map((item, n) => <ListGroupItem bsStyle="info"
                                                                                      key={n}>{item.item.name}{item.resp.map((i, m) =>
                                    <ListGroupItem bsStyle="success"
                                                   key={m}>{i.name}</ListGroupItem>)}
                                </ListGroupItem>) :
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