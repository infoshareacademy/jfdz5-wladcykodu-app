import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'

class PartCategory extends Component {
    state = {
        partsCat: [],
        manufacturer: "",
        cid: "",
        eid: ""
    }

    componentDidMount() {
        let manufacturer = this.props.match.params.manufacturer
        this.setState({manufacturer})
        let cid = this.props.match.params.cid
        this.setState({cid})
        let eid = this.props.match.params.eid
        this.setState({eid})

        fetch('/api/v2/find/' + manufacturer + '/' + cid + '/' + eid)

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
                        <h2>Select category from list below:</h2>
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