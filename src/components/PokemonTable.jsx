import React from "react";
import { useMemo } from "react";
import {
  useTable,
  useFlexLayout,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { FixedSizeList } from "react-window";
import TableFilter from "./TableFilter";
import styled from "styled-components";

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
	vertical-align: top;
	}

	.thead{
	vertical-align: middle;
		.th, .td {
			border-color: #dbdbdb;
			border-width: 0 0 2px;
			border-style: solid;
			color: #363636;
			padding: 0.5rem 0; 
			font-weight: bold;
		}
	}

	.tr{
	display: table-row;
	vertical-align: inherit;
	border-color: inherit;
	}

	.tbody .td {
	}

	.filters{
	border: 1px solid #dbdbdb;
	border-width: 0 0 1px;
	padding: 0.5rem 0;
	}
	
	.cellId{
		text-align: center;
		height: 100%;
	}

	.cellId span {
		display: inline-block;
		vertical-align: middle;
		line-height: 50px;
	}
`;

function PokemonTable({ allPokemonsData }) {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        width: 50,
        align: "right",
        Cell: (tableProps) => (
          <div className="cellId"><span>{tableProps.row.original.id}</span></div>
        ),
      },
      {
        Header: "Sprite",
        accessor: "sprite",
        Cell: (tableProps) => (
          <figure className="image is-96x96">
            <img
              src={tableProps.row.original.sprites["front_default"]}
              alt=""
            />
          </figure>
        ),
        width: 100,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Type",
        accessor: "type",
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={allPokemonsData} />
    </Styles>
  );
}

function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
    },
    useFlexLayout,
    useGlobalFilter,
    useSortBy
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <div {...getTableProps()} className="table">
      <div className="thead">
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map((column) => (
              <div
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="th"
              >
                {column.render("Header")}
                <span className="sort">
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="filters">
        <TableFilter
          preFilteredRows={preGlobalFilteredRows}
          filter={state.globalFilter}
          setFilter={setGlobalFilter}
        />
      </div>

      <div {...getTableBodyProps()} className="tbody">
        <FixedSizeList
          height={500}
          itemCount={rows.length}
          itemSize={100}
          width={"100%"}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}

export default PokemonTable;
