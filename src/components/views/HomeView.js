import React, {Component} from 'react';
import {Grid, Col} from 'react-bootstrap'

class HomeView extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {items: []}
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
                        <h2>Home View...</h2>
                        <ul>
                            {this.state.items.length ?
                                this.state.items.map(item => <li key={item.id}>{item.name}</li>)
                                : <li>Loading...</li>
                            }
                        </ul>
                    </Col>
                </Grid>
            </div>
        );
    }
}

export default HomeView