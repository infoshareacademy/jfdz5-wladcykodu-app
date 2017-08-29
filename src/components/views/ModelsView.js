import React from 'react'

import ModelsList from '../ModelsList'
import DataFetcher from '../DataFetcher'



const ModelsView = props => {
    console.log(props)
    const makeId = props.match.params.makeId

    return (
        <div>
            <h1>Chose model:</h1>

            <DataFetcher
                dataUrl={`/api/v2/find/${makeId}`}
                component={ModelsList}
                propName="models"
            />
        </div>
    )
}

export default ModelsView
