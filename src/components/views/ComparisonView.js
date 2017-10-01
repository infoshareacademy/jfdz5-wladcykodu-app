import React from 'react'
import {connect} from 'react-redux'

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
        {(this.props.comparisonItems !== null) ?
          this.props.comparisonItems.map(
            (item, m) => {
              return (
                <div key={m}>

                  <h3>{item.part.data.name}</h3>
                  <h5>About:</h5>
                  <p><span>Brand:</span> {item.part.data.brand}
                  </p>
                  <p><span>Number:</span> {item.part.data.number}
                  </p>
                  <p><span>Status:</span> {item.part.data.status}
                  </p>
                </div>
              )
            }
          )
          : <h3>You haven't added any part to comparison list yet</h3>
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    comparisonItems: state.compareParts.comparison
  })
)(ComparisonView)