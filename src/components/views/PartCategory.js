import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'

class PartCategory extends Component {
    state = {
        partsCat: [],
        pid: "",
        cid: "",
        eid: ""
    }

    componentDidMount() {
        let pid = this.props.match.params.pid
        this.setState({pid})
        let cid = this.props.match.params.cid
        this.setState({cid})
        let eid = this.props.match.params.eid
        this.setState({eid})


        fetch('/api/v2/find/' + pid + cid + eid)

            .then(result => result.json())
            .then(res => {
                const partsCat = res.data
                this.setState({partsCat})
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
                                this.state.partsCat.length ?
                                    this.state.partsCat.map(
                                        item => (
                                            <ListGroupItem bsStyle="info"
                                                           key={item.id}>{item.name}
                                            </ListGroupItem>))
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

export default PartCategory