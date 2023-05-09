import React from 'react';
import { useTable, useFlexLayout, useSortBy } from 'react-table';
import { FixedSizeList } from 'react-window'
import styled from 'styled-components'

const Styles = styled.div`
	display: block;
  padding: 1rem;

  .table {
		width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 1px solid black;
      }
    }
  }

	.span{
		text-align: right;
	}
`

function MovesList({ columns, data }) {
	return (
	<Styles>
		<Table columns={columns} data={data}/>
	</Styles>
	)
}

function Table({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = useTable({
		columns,
		data,
	}, useFlexLayout, useSortBy);

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className='tr'
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className='td'>
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

	return (
    <div {...getTableProps()} className='table'>
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className='tr'>
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps(column.getSortByToggleProps())} className='th'>
                {column.render('Header')}
								<span className='sort'>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={500}
          itemCount={rows.length}
          itemSize={80}
          width={'100%'}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  )
}

export default React.memo(MovesList);
