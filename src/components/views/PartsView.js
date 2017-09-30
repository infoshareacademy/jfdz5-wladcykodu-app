import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {API_URL} from '../App'
import {connect} from 'react-redux'
import {setTreeNode} from '../../state/tree'
import testNodes from '../../data/testdata.json'

class PartsView extends Component {

  // result = {
  // data : null,
  // datatype : null
  // }

  componentDidMount() {
//    this.props.setTree(0, {jeden: 1}, 0)
//    this.props.setTree(1, {dwa: 1}, 11)
//    this.props.setTree(2, {trzy: 1}, 7)
    this.fetchData(`${API_URL}/api/v2`, 0, 0)
  }


  fetchData = (url, level, position) => {
    console.log(url)
    fetch(
      url
    ).then(
      response => response.json()
    ).then(
      result => {
        //this.props.setTree(level, {data: result.data, datatype: result.datatype}, 0)
        this.props.setTree(level, result, position)
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
    let inputLevel = parseInt(event.currentTarget.getAttribute('data-level'))
    let newLevel = inputLevel + 1
    let inputPosition = event.currentTarget.selectedIndex - 1

    if (event.currentTarget.selectedIndex > 0) {
      console.log('inputPosition:', inputPosition)
      console.log('inputLevel: ', inputLevel)
      console.log(this.props.dataNodes[inputLevel].datatype[inputPosition])
      let url = this.props.dataNodes[inputLevel].data[inputPosition].link
      console.log(`${API_URL}${url}`, newLevel, inputPosition)
      this.fetchData(`${API_URL}${url}`, newLevel, inputPosition)
    } else {
      // tree/TRUNCATE, newLevel
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
            if (item.datatype != 'stock') {
            return (
                              <FormGroup controlId="formControlsSelect" key={itemIndex}>
                  <ControlLabel>{this.getLabel(item.datatype)}</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    onChange={this.handleSelect}
                    data-level={itemIndex}
                    data-type={item.datatype}
                    defaultValue="..."
                    // defaultValue={item.data[2] ? item.data[2].name : item.data[0].name}
                    // inputRef={ inputSelect => this.inputSelect=inputSelect }
                  >
                    <option value="..." key="0">...</option>
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
               return (<h1>Tu będzie lista części</h1>)
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
  setTree: (level, node, parentPosition) => dispatch(setTreeNode(level, node, parentPosition))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartsView)
