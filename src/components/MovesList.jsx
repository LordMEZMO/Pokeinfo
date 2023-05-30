import React from 'react';
import styled from 'styled-components'
import Table from './Table';
import { MovesListStyles } from './styles/MovesListStyles';
import { useMemo } from 'react';
import PokemonType from './PokemonType';

function MovesList({ data }) {
	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				width:  50,
				align: 'right',
			},
			{
				Header: 'Name',
				accessor: 'name',
				Cell: (tableProps) => (<span className='capitalized'>{tableProps.row.original.name}</span>)
			},
			{
				Header: 'Type',
				accessor: 'type',
				Cell: (tableProps) => (<PokemonType type={tableProps.row.original.type} />)
			},
			{
				Header: 'Accuracy',
				accessor: 'accuracy',
			},
			{
				Header: 'Target',
				accessor: 'target'
			},
			{
				Header: 'Description',
				accessor: 'desc'
			}
		],
		[]
	);

	return (
	<MovesListStyles>
		<Table columns={columns} data={data}/>
	</MovesListStyles>
	)
}


export default React.memo(MovesList);
