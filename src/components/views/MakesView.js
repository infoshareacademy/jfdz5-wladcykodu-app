import React from 'react'

import MakesList from '../MakesList'
import DataFetcher from '../DataFetcher'



const MakesView = () => (
    <div>
        <h1>Chose brand:</h1>

        <DataFetcher
            dataUrl='/api/v2?lang=polish'
            component={MakesList}
            propName="makes"
        />
    </div>
)

export default MakesView
