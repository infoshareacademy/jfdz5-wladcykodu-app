import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, Grid, Col} from 'react-bootstrap'

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
          <Col style={{textAlign: "center"}}>
            <h2>Select your car brand:</h2>
            <ListGroup>
              {
                this.state.items.length ?
                  this.state.items.map(
                    item => {
                      const url = `/brands/${item.name}-${item.id}`
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
          </Col>
        </Grid>
      </div>
    )
  }
}

export default HomeView