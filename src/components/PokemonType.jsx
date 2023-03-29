import React from 'react'
import './styles/pokeTypes.css'

function PokemonType({type}) {
  return (
    <div className={'tag card-footer-item pokemon-type  ' + type.toLowerCase()}>
        {type}
    </div>
  )
}

export default PokemonType