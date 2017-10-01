import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {API_URL} from '../App'
import {connect} from 'react-redux'
import {setTreeNode, truncateTree} from '../../state/tree'
import testNodes from '../../data/testdata.json'
import PartsList from './PartsList'
import { withRouter} from 'react-router-dom'

class PartsView extends Component {

  // result = {
  // data : null,
  // datatype : null
  // }

  componentDidMount() {
//    this.props.setTree(0, {jeden: 1}, 0)
//    this.props.setTree(1, {dwa: 1}, 11)
//    this.props.setTree(2, {trzy: 1}, 7)
    if (this.props.dataNodes.length === 0) {
      this.fetchData(`${API_URL}/api/v2`, 0, null)
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
        //this.props.setTree(level, {data: result.data, datatype: result.datatype}, 0)
        this.props.setTree(level, result, parentPosition)
        // this.result = {
        //   data: result.data,
        //   datatype: result.datatype
        // }
      }
    ).catch(
      error => console.log(error)
    )
  }

  handleSelect = event => {
    let inputLevel = parseInt(event.currentTarget.getAttribute('data-level'), 10)
    let newLevel = inputLevel + 1
    let inputPosition = event.currentTarget.selectedIndex
    let parentPosition = inputPosition -1

    this.props.trucateTree(newLevel)
    if (inputPosition > 0) {
      console.log('handleSelect inputPosition:', inputPosition)
      console.log('handleSelect inputLevel: ', inputLevel)
      console.log('handleSelect datatype: ', this.props.dataNodes[inputLevel].datatype)
      let url = this.props.dataNodes[inputLevel].data[parentPosition].link
      console.log('handleSelect: url: ',`${API_URL}${url}`
        , 'inputLevel: ', inputLevel
        , 'newLevel: ', newLevel
        , 'inputPosition: ', inputPosition
        , 'parentPosition: ', parentPosition)
      this.fetchData(`${API_URL}${url}`, newLevel, parentPosition)
    } else {
      // tree/TRUNCATE, newLevel
      this.props.trucateTree(newLevel)
    }


  }

  getLabel = datatype => {
    if (datatype) {
      let label = '';
      switch(datatype) {
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

  dataLevel = 1

  render() {

    const {dataNodes, positions} = this.props

    //dla testu
    const tdataNodes = testNodes

    // console.log(dataNodes, positions )
    // const data1 = dataNodes
    // const data11 = data1["0"]
    // console.log('data1: ',data1)
    // // console.log('data1: ',data1, data1[0].data[0].name)
    // //console.log('data11: ',data11)
    //console.log(this.props.dataNodes[0].data[0])
    // const data2 = [{datatype: "brands", data:[{id:"A01", name:"jeden"},{id:"A02", name:"dwa"},{id:"A03", name:"trzy"}]}]
    // console.log('data2: ', data2, data2[0].data[0].name)
    // //console.log(JSON.stringify(dataNodes))
    // console.log('testNodes: ', testNodes)
    // console.log('data3: ', testNodes[0].data[0].name)

    return (
      <div>

        {dataNodes.map(
          (item, itemIndex) => {
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
                    // defaultValue="select..."
                     defaultValue={
                      ( positions[itemIndex] !== null && positions[itemIndex] >= 0 )
                      ? item.data[positions[itemIndex]].name
                      : "select..."
                    }
                    // defaultValue={positions[itemIndex] === null ? '...' : item.data[positions[itemIndex]].name}
                    // defaultValue={item.data[2] ? item.data[2].name : item.data[0].name}
                    // inputRef={ inputSelect => this.inputSelect=inputSelect }
                  >
                    <option value="select..." key="0">select...</option>
                    {item.data.map((option, optionIndex) => {
                        return (
                          <option value={option.name} key={optionIndex + 1}>{option.name}</option>
                        )
                      }
                    )}
                  </FormControl>
                </FormGroup>
            )
              } else {

              const partsLink = dataNodes[itemIndex-1].data[positions[itemIndex-1]].link
              console.log('moje: ', partsLink)
              return (
                <PartsList partslink={partsLink}/>
              )


              // React.createElement(
              //   component,
              //   {
              //     [propName]: data
              //   }
              // )

            }



          }
        )}

        {/*<FormGroup controlId="formControlsSelect">*/}
          {/*<ControlLabel>Choose car makes</ControlLabel>*/}
          {/*<FormControl*/}
            {/*componentClass="select"*/}
            {/*placeholder="select"*/}
            {/*onChange={this.handleSelect}*/}
            {/*data-level={this.dataLevel}*/}
            {/*// defaultValue=""*/}
            {/*// inputRef={ inputSelect => this.inputSelect=inputSelect }*/}
          {/*>*/}
            {/*<option value="...">...</option>*/}
            {/*<option value="one">one</option>*/}
            {/*<option value="two">two</option>*/}
            {/*<option value="three">three</option>*/}
            {/*<option value="four">four</option>*/}
          {/*</FormControl>*/}
        {/*</FormGroup>*/}
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(PartsView)

const ConnectedPartsView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartsView)

export default withRouter(ConnectedPartsView)