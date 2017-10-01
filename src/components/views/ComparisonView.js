import React from 'react'
import {connect} from 'react-redux'
import {Table, Grid, Row, Col} from 'react-bootstrap'

class ComparisonView extends React.Component {

  state = {
    comparison: []
  }

  render() {
    console.log(this.props.comparisonItems)
    console.log(this.props.comparisonItems.length)
    return (
      <div>
        <p>Items in comparison:</p>
        <Grid>
        <Row className="table-grid">
          <Col xs={3} sm={3} lg={3} xl={3} className="table-container">
            <Table striped bordered condensed hover>
              <thead>
              <tr>
                <th>Category</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Part name</td>
              </tr>
              <tr>
                <td>Brand</td>
              </tr>
              <tr>
                <td>Number</td>
              </tr>
              <tr>
                <td>Status</td>
              </tr>
              </tbody>
            </Table>
          </Col>

          {(this.props.comparisonItems !== null) ?
            this.props.comparisonItems.map(
              (item, m) => {
                return (
                  <Col xs={3} sm={3} lg={3} xl={3} className="table-container">
                    <Table striped bordered condensed hover key={m}>
                      <thead>
                      <tr>
                        <th>Part</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>{item.part.data.name}</td>
                      </tr>
                      <tr>
                        <td>{item.part.data.brand}</td>
                      </tr>
                      <tr>
                        <td>{item.part.data.number}</td>
                      </tr>
                      <tr>
                        <td>{item.part.data.status}</td>
                      </tr>
                      </tbody>
                    </Table>
                  </Col>
                )
              }
            )

            : <h3>You haven't added any part to comparison list yet</h3>
          }

        </Row>
        </Grid>
      </div>
    )
  }
}

export default connect(
  state => ({
    comparisonItems: state.compareParts.comparison
  })
)(ComparisonView)