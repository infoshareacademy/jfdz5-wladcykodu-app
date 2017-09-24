import React from 'react'
import styled from 'styled-components'



const ComparisionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`


class ComparisionView extends React.Component {

  render() {
    return (
        <ComparisionContainer>
            <h3>Comparision</h3>

        </ComparisionContainer>
    );
  }

}

export default ComparisionView
