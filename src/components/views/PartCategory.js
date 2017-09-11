import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class PartCategory extends Component {
    state = {
        partsCat: [],
        partsTypes: [],
    }

    componentDidMount() {
        const {manufacturer, model, engineId} = this.props.match.params

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
                    <Col style={{textAlign: "center"}}>
                        <h2>Select category from list below:</h2>
                        <ListGroup>
                            {
                                this.state.partsTypes.length ?
                                    this.state.partsTypes.map(
                                        (partsType, n) => (
                                            <ListGroupItem
                                                bsStyle="info"
                                                key={n}>

                                                {partsType.item.name}
                                                {
                                                    partsType.resp.map(
                                                        (i, m) => {
                                                            return (
                                                                <ListGroupItem
                                                                    bsStyle="success"
                                                                    key={m}>

                                                                    {i.has_children === true ?
                                                                        <Link
                                                                            to={`/brands/${i.link.split('/').slice(-4).join('/')}`}>{i.name}</Link> :
                                                                        <Link
                                                                            to={`/brands/${i.link.split('/').slice(-5).join('/')}`}>{i.name}</Link>}
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