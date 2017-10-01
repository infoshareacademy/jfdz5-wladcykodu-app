import React from 'react'
import {connect} from 'react-redux'
import { add } from '../../state/comparison'
/*import * as firebase from 'firebase'
import {Grid, Row, Col, Image, Button} from 'react-bootstrap'
import {API_URL} from '../App'
import FaStar from 'react-icons/lib/fa/star'
*/

class ComparisonView extends React.Component {

  render() {
    return (
      <div>
        Comparison
{/*
        {
          (this.state.comparison.length === 0)
            ?
            Object.entries(this.state.comparison).map(([id, item]) => {
              return (
                <div key={item.id}>
                  <h3>{this.state.comparison.part.data.name}</h3>
                  <h5>About:</h5>
                  <p><span>Brand:</span> {this.state.comparison.part.data.brand}
                  </p>
                  <p><span>Number:</span> {this.state.comparison.part.data.number}
                  </p>
                  <p><span>Status:</span> {this.state.comparison.part.data.status}
                  </p>
                </div>
              )
            })
            :
            <div>no items</div>
        }
*/}

      </div>
    )
/*    if (this.state.comparison.length === 0) {
      console.log(this.state.comparison.length)
      return (<div>no</div>)
    } else {
      (this.state.comparison).map(
        ([id, item]) => (
          <div key={item.id}>
            <h3>{this.state.comparison.part.data.name}</h3>
            <h5>About:</h5>
            <p><span>Brand:</span> {this.state.comparison.part.data.brand}
            </p>
            <p><span>Number:</span> {this.state.comparison.part.data.number}
            </p>
            <p><span>Status:</span> {this.state.comparison.part.data.status}
            </p>
          </div>
        )
      )
    }*/
  }
}


const mapDispatchToProps = dispatch => ({
  addToComparison:  comparePart => dispatch(add(comparePart))
})

export default connect(

  mapDispatchToProps
)(ComparisonView)