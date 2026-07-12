import * as React from 'react'
import PositiveNegativeButton from '../../shared/components/PositiveNegativeButton'

function History() {
    return(
      <div>
        <h2>History</h2>
        <h4>Here you can check where you spend and gain your money from.</h4>
        <PositiveNegativeButton text='Filter by income' isCurrentlySelected={false} backgroundColor='#1E9326' hoveredBackgroundColor='#32A039' selectedBackgroundColor='#1A7E21' onClick={() => {console.log('hi')}}/>
      </div>
    )
}

export default History