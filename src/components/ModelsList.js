import React from 'react';
import {Grid, Col} from 'react-bootstrap'

const ModelsList = ({models}) => {

    return (
        <div>
            <Grid>
                <Col lg={6} lgPush={3} xs={12} sm={12} md={6} mdPush={3} style={{textAlign: "center"}}>
                    <ul>
                        {models !== null ?
                            models.data.map(item => <li key={item.id}>{item.name}</li>)
                            : <li>Loading...</li>
                        }
                    </ul>
                </Col>
            </Grid>
        </div>
    )

}
export default ModelsList
