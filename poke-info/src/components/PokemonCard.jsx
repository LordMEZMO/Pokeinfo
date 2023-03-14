import React from 'react'

function PokemonCard({name, link}) {
	const capitalize = (text) => text.at(0).toUpperCase() + text.slice(1)

  return (
	<div className='card'>
		<div className="card-header">
			<h5 className="card-header-title">
				<a href={link}>{capitalize(name)}</a>
			</h5>
		</div>
	</div>
  )
}

export default PokemonCard