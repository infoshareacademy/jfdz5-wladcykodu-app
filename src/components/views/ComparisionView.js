import React from 'react'
import { connect } from 'react-redux'
/*import styled from 'styled-components'
import {Button, Row, Col, Grid, Panel, ButtonToolbar} from 'react-bootstrap'*/


/*const ComparisonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`*/

class ComparisonView extends React.Component {
  state = {
    comparison: []
  }


//functions

  render() {
    return (
      <h3>Comparison</h3>

    )
  }
}


export default connect(
  state => ({
    compareParts: state.compareParts,
    comparison: state.comparison
  })
)(ComparisonView)