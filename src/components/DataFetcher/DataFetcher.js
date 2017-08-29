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

    componentDidMount() {
        this.setState({
            apiData: {
                fetching: true,
                error: null
            }
        })
        fetch(
            this.props.dataUrl
        ).then(
            response => response.json()
        ).then(
            data => this.setState({
                apiData: {
                    result: data,
                    fetching: false,
                    error: null
                }
            })
        ).catch(
            error => this.setState({
                apiData: {
                    error: error,
                    fetching: false
                }
            })
        )
        this.handleFetchData()
    }



    render() {
        const {result, fetching, error} = this.state.apiData
        const {component, propName} = this.props

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
                                        [propName]: result.data
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