import React from 'react'
import { connect } from 'react-redux'
import { add } from '../../state/dataFetcher'

class DataFetcher extends React.Component {

    handleFetchData = () => this.props.addApiData(this.state.apiData)

    state = {
        apiData: {
            result: null,
            fetching: false,
            error: null
        }
    }


    // componentWillMount() {
    componentDidMount() {
        console.log('cDM start. state:', this.state)
        this.state = {
            apiData: {
                result: null,
                fetching: true,
                error: null
            }
        }
        console.log('cDM aftre setting initial state. state:', this.state)
        fetch(
            this.props.dataUrl
        ).then(
            response => response.json()
        // ).then(
        //     data => this.setState({
        //         apiData: {
        //             result: data,
        //             fetching: false,
        //             error: null
        //         }
        //     })
        ).then(
            data => {
                console.log('cDM before setting state.apiData from data. data:', data)
                this.state = {
                    apiData: {
                        result: data,
                        fetching: false,
                        error: null
                    }
                }
                console.log('cDM after setting state. state: ',this.state)
            }
        ).catch(
            // error => this.setState({
            //     apiData: {
            //         error: error,
            //         fetching: false
            //     }
            // })
            error => {
                this.state = {
                    apiData: {
                        result: null,
                        fetching: false,
                        error: error
                    }
                }
            }
        )
       console.log('cDM end. state:',this.state)

        this.handleFetchData()
    }



    render() {
        const {result, fetching, error} = this.state.apiData
        const {component, propName} = this.props
        console.log('render start. result:', result)
        console.log('render start. state:',this.state)

        return (
            <div>
                {
                    fetching === false ? null : <p>Fetching data...</p>
                }
                {
                    error === null ? null : <p>{error.message}</p>
                }
                {
                    result === null ? null :
                        (
                            result.data.length === 0 ?
                                <p>No data found</p> :
                                React.createElement(
                                    component,
                                    {
                                        [propName]: result
                                    }
                                )
                        )
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        apiData: state.apiData
    }),
    dispatch => ({
        addApiData: data => dispatch(add(data))
    })
)(DataFetcher)