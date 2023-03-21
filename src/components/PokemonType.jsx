import React from 'react'

function PokemonType({type}) {
  return (
    <div className='tag is-danger card-footer-item '>
        {type}
    </div>
  )
}

export default PokemonType