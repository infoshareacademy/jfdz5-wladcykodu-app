import React, {Component} from 'react'
import {Grid, Col} from 'react-bootstrap'

class Part extends Component {

    componentDidMount() {
        const part = this.props.match.params.part
        this.setState({part})
        const partNum = this.props.match.params.partNum
        this.setState({partNum})

        fetch(`/api/v2/part/${part}/${partNum}`)

            .then(result => result.json())
            .then(res => {
                const part = res.data
                this.setState({part})
            })
    }

    render() {
        return (

            <div>
                <Grid>
                    <Col style={{textAlign: "center"}}>
                        <h2>Part:</h2>
                    </Col>
                </Grid>
            </div>
        )
    }
}

export default Part