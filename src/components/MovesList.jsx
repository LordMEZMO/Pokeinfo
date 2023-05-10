import React from 'react';
import { useTable, useFlexLayout, useSortBy, useGlobalFilter } from 'react-table';
import { FixedSizeList } from 'react-window'
import styled from 'styled-components'
import { useMemo } from 'react';
import TableFilter from './TableFilter';

const Styles = styled.div`
	display: block;
  padding: 1rem;
  border-collapse: collapse;


  .table {
		width: 100%;
    border-spacing: 0;

    }

    .td,th{
      border: 1px solid #dbdbdb;
      border-width: 0 0 1px;
      padding: .5em .75em;
      vertical-align: top;
    }

    .thead{
      vertical-align: middle;
          .th, .td {
            border-color: #dbdbdb;
            border-width: 0 0 2px;
            border-style: solid;
            color: #363636;  
            padding: 1.1rem 0;
            font-weight: bold;
          }
    }

    .tr{
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }

    .filters{
      border: 1px solid #dbdbdb;
      border-width: 0 0 1px;
      padding: 0.2rem 0;
    }
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
  const filterTypes = React.useMemo(() => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
    state,
		prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter
	} = useTable({
		columns,
		data,
    filterTypes
	}, useFlexLayout, useGlobalFilter, useSortBy);

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
      <div className='thead'>
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

      <div className='filters'>
        <TableFilter preFilteredRows={preGlobalFilteredRows} filter={state.globalFilter} setFilter={setGlobalFilter}/>
      </div>

      <div {...getTableBodyProps()} className='tbody'>
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
