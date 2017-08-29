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


    componentWillMount() {
    // componentDidMount() {
        console.log(this.state)
        this.state = {
            apiData: {
                result: null,
                fetching: true,
                error: null
            }
        }
        console.log(this.state)
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
                console.log('before', data)
                this.state = {
                    apiData: {
                        result: data,
                        fetching: false,
                        error: null
                    }
                }
                console.log('state after: ',this.state)
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
       console.log('after dół',this.state.apiData)

        this.handleFetchData()
    }



    render() {
        // const {result, fetching, error} = this.state.apiData
        const result = this.state.apiData.result
        const fetching = this.state.apiData.fetching
        const error = this.state.apiData.error

        const {component, propName} = this.props
        console.log('start render result:', result)
        console.log('start render state:',this.state)

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