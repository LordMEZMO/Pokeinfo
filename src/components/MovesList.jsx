import React from 'react';
import styled from 'styled-components'
import Table from './Table';
import { MovesListStyles } from './styles/MovesListStyles';


function MovesList({ columns, data }) {
	return (
	<MovesListStyles>
		<Table columns={columns} data={data}/>
	</MovesListStyles>
	)
}


export default React.memo(MovesList);
