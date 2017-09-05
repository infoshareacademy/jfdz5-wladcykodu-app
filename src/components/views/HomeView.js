import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'
import styled from 'styled-components'

const ListOfBrands = styled.ul`
	background: #f1a0a0;
	border-radius: 3em;
`

class HomeView extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        fetch('/api/v2?lang=polish')
            .then(result => result.json())
            .then(res => {
                const items = res.data
                this.setState({items})
            })
    }

    render() {

        return (

            <div>
                <Grid>
                    <Col lg={6} lgPush={3} xs={12} sm={12} md={6} mdPush={3} style={{textAlign: "center"}}>
                        <h1>Welcome in our App :)</h1>
                        <h2>Select your car brand:</h2>
                        <ListOfBrands>
                            <ListGroup>
                                {
                                    this.state.items.length ?
                                        this.state.items.map(
                                            item => {
                                                const url = '/brands/' + item.name
                                                return (

                                                    <ListGroupItem
                                                        bsStyle="info"
                                                        key={item.id}
                                                    >
                                                        <Link to={url}>{item.name}</Link>
                                                    </ListGroupItem>)
                                            })
                                        : <li>Loading...</li>
                                }
                            </ListGroup>
                        </ListOfBrands>
                    </Col>
                </Grid>
            </div>
        )
    }
}

export default HomeView