import React, {Component} from 'react'
import {Grid, Col, Image} from 'react-bootstrap'

class Part extends Component {

  state = {
    partData: null
  }

  componentDidMount() {
    const {part, partNum} = this.props.match.params

    fetch(`/api/v2/part/${part}/${partNum}`)
      .then(result => result.json())
      .then(res => {
        const partData = res.data
        this.setState({partData})
      })
  }

  render() {
    return (
      <div>
        {
          this.state.partData === null ? <p>Loading…</p> :

            <Grid>
              <Col style={{textAlign: "center"}}>
                <h2>Part:</h2>
                <Image responsive src={this.state.partData.part.jpg[0]}
                       alt="Picture of part"/>
              </Col>
            </Grid>
        }
      </div>
    )
  }
}

export default Part