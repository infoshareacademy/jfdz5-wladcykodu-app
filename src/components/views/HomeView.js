import React from 'react'
import {Grid, Col} from 'react-bootstrap'

const HomeView = () => (
    <Grid>
        <Col lg={6} lgPush={3} xs={12} sm={12} md={6} mdPush={3} style={{textAlign: "center"}}>
            <h1>Welcome in our App :)</h1>
            <h2>Home View...</h2>

        </Col>
    </Grid>
)
export default HomeView
