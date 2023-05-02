import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import MovesListElement from './MovesListElement';
import { useTable } from 'react-table';
import { convertAllMovesData, convertMoveData } from '../Helpers';

function MovesList({ allMovesData }) {
	const data = React.useMemo(() => convertAllMovesData(allMovesData), [allMovesData]);

	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id' // accessor is the "key" in the data
			},
			{
				Header: 'Name',
				accessor: 'name' // accessor is the "key" in the data
			},
			{
				Header: 'Type',
				accessor: 'type' // accessor is the "key" in the data
			},
			{
				Header: 'Accuracy',
				accessor: 'accuracy'
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

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data
	});

	return (
		<table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								{...column.getHeaderProps()}
								style={{
									borderBottom: 'solid 3px red',
									background: 'aliceblue',
									color: 'black',
									fontWeight: 'bold'
								}}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td
										{...cell.getCellProps()}
										style={{
											padding: '10px',
											border: 'solid 1px gray',
											background: 'papayawhip'
										}}>
										{cell.render('Cell')}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default React.memo(MovesList);
