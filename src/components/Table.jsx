import React from 'react';
import { useTable, useFlexLayout, useSortBy, useGlobalFilter } from 'react-table';
import { FixedSizeList } from 'react-window'
import TableFilter from './TableFilter';

function Table({ columns, data, rowHeight=80 }) {
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
            itemSize={rowHeight}
            width={'100%'}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    )
  }

  export default Table;