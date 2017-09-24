import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'

class CarModel extends Component {
    state = {
        engineTypes: [],
        manufacturer: '',
        searching: true
    }

    componentDidMount() {
        const manufacturer = this.props.match.params.manufacturer
        this.setState({manufacturer})

        let manufPid = manufacturer.split('-')
        let pid = manufPid[manufPid.length - 1]

        fetch(`https://isa.mateuszmarzecki.pl/v1/proxy?url=http://infoshareacademycom.2find.ru/api/v2/find/${pid}`)
            .then(result => result.json())
            .then(res => {
                const items = res.data
                items.forEach((item) => {
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
        const searching = false
        this.setState({searching})
    }

    render() {
        return (

            <div>
                <Grid>
                    <Col style={{textAlign: "center"}}>
                        <h2>Select car model and engine type</h2>
                        <ListGroup>
                            {
                                this.state.engineTypes.length ?
                                    this.state.engineTypes.map(
                                        (engineType, n) => (
                                            <ListGroupItem
                                                bsStyle="info"
                                                key={n}>

                                                {engineType.item.name}
                                                {
                                                    engineType.resp.map(
                                                        (i, m) => {

                                                            const url = `/brands/${this.state.manufacturer}/${i.link.split('/').slice(-2).join('/')}`

                                                            return (
                                                                <ListGroupItem
                                                                    bsStyle="success"
                                                                    key={m}>

                                                                    <Link to={url}>{i.name}</Link>
                                                                </ListGroupItem>
                                                            )
                                                        }
                                                    )
                                                }
                                            </ListGroupItem>)) :
                                    <li>{this.state.searching === true ? "Loading..." : "No manufacturer"}</li>}

                        </ListGroup>
                        <br/>

                    </Col>
                </Grid>
            </div>
        )
    }
}

export default CarModel