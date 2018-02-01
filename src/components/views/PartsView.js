import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl, ListGroup, ListGroupItem} from 'react-bootstrap'
import {connect} from 'react-redux'
import {setTreeNode, truncateTree} from '../../state/tree'
import PartsList from './PartsList'
import {withRouter} from 'react-router-dom'
import * as firebase from 'firebase'
import './PartsView.css'

class PartsView extends Component {

  componentDidMount() {
    if (this.props.dataNodes.length === 0) {
      this.fetchData(`/api/v2`, 0, null)
    }
  }


  fetchData = (url, level, parentPosition) => {
    console.log('fetchData url input param', url)
    fetch(
      url
    ).then(
      response => response.json()
    ).then(
      result => {
        this.props.setTree(level, result, parentPosition)
      }
    ).catch(
      error => console.log(error)
    )
  }

  handleSelect = event => {
    let inputLevel = parseInt(event.currentTarget.getAttribute('data-level'), 10)
    let newLevel = inputLevel + 1
    let inputPosition = event.currentTarget.selectedIndex
    let parentPosition = inputPosition - 1

    this.props.trucateTree(newLevel)
    if (inputPosition > 0) {
      console.log('handleSelect inputPosition:', inputPosition)
      console.log('handleSelect inputLevel: ', inputLevel)
      console.log('handleSelect datatype: ', this.props.dataNodes[inputLevel].datatype)
      let url = this.props.dataNodes[inputLevel].data[parentPosition].link
      console.log('handleSelect: url: ', `${url}`
        , 'inputLevel: ', inputLevel
        , 'newLevel: ', newLevel
        , 'inputPosition: ', inputPosition
        , 'parentPosition: ', parentPosition)
      this.fetchData(`${url}`, newLevel, parentPosition)
    } else {
      // tree/TRUNCATE, newLevel
      this.props.trucateTree(newLevel)
    }


  }

  getLabel = datatype => {
    if (datatype) {
      let label = '';
      switch (datatype) {
        case 'brands' :
          label = 'Choose car brand:'
          break;
        case 'models':
          label = 'Choose car model:'
          break;
        case 'types':
          label = 'Choose engine type:'
          break;
        case 'tree':
          label = 'Choose category:'
          break;
        default:
          label = 'Choose option:'
      }
      return label
    }

  }

  getUserName = () => {
    const user = firebase.auth().currentUser

    if (user !== null) {
      return user.displayName
    }

  }

  render() {

    const {dataNodes, positions} = this.props

    return (
      <div>
        <div className="hello">
          <h3>Hello <span className="user">{this.getUserName()}</span> ! What are you looking for?</h3>
          <h4>Start your search by entering car brand:</h4>
        </div>
        {dataNodes.map(
          (item, itemIndex) => {
            if (item.hasOwnProperty('data')) {
              if (item.datatype !== 'stock') {
                return (
                  <FormGroup controlId="formControlsSelect" key={itemIndex}>
                    <ControlLabel>{this.getLabel(item.datatype)}</ControlLabel>
                    <FormControl
                      componentClass="select"
                      placeholder="select"
                      onChange={this.handleSelect}
                      data-level={itemIndex}
                      data-type={item.datatype}
                      defaultValue={
                        (positions[itemIndex] !== null && positions[itemIndex] >= 0)
                          ? item.data[positions[itemIndex]].name
                          : "select..."
                      }
                    >
                      {
                        item.hasOwnProperty('data') && (item.data.length === 0
                          ? <option value="no data found..." key={0}>no data found...
                            :(</option>
                          : <option value="select..." key={0}>select...</option>)
                      }

                      {
                        item.hasOwnProperty('data') && item.data.map((option, optionIndex) => {
                            return (<option value={option.name}
                                            key={optionIndex + 1}>{option.name}</option>)
                          }
                        )
                      }

                    </FormControl>
                  </FormGroup>
                )
              } else {

                const partsLink = dataNodes[itemIndex - 1].data[positions[itemIndex - 1]].link
                console.log('moje: ', partsLink)
                return (
                  <PartsList key={itemIndex} partslink={partsLink}/>
                )

              }
            } else if (item.hasOwnProperty('error')) {
              return (
                <ListGroup key={itemIndex}>
                  <ListGroupItem key={1} bsStyle="danger">{item.message}</ListGroupItem>
                </ListGroup>

              )
            }


          }
        )}

      </div>

    )
  }
}

const mapStateToProps = state => ({
  dataNodes: state.tree.dataNodes,
  positions: state.tree.positions
})

const mapDispatchToProps = dispatch => ({
  setTree: (level, node, parentPosition) => dispatch(setTreeNode(level, node, parentPosition)),
  trucateTree: (level) => dispatch(truncateTree(level))
})

const ConnectedPartsView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartsView)

export default withRouter(ConnectedPartsView)