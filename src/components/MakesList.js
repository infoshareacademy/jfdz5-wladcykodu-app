import React from 'react';
import {Grid, Col} from 'react-bootstrap'


console.log(this.props)
const makes = this.props.makes


const MakesList = makes => {

    return (

        <div>
            <Grid>
                <Col lg={6} lgPush={3} xs={12} sm={12} md={6} mdPush={3} style={{textAlign: "center"}}>
                    <ul>
                        {makes !== null ?
                        makes.data.map(item => <li key={item.id}>{item.name}</li>)
                        : <li>Loading...</li>
                        }
                    </ul>
                </Col>
            </Grid>
        </div>
    )

}
export default MakesList
