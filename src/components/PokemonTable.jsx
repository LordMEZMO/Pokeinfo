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
import PokemonType from "./PokemonType";

const capitalize = (text) => {
  if (text.length > 0)
  return text.at(0).toUpperCase() + text.slice(1)
  else return ""
}

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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
	}

	.cellId span {
		display: inline-block;
	}

  .stat{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; 
    height: 100%;
  }
  .nameSpan::first-letter{
    text-transform: uppercase;

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
        accessor: "names",
        Cell: (tableProps) => (
          <div className="name"><span className="nameSpan">{tableProps.row.original.name}</span></div>
        )
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: (tableProps) => (
          <div className="is-flex is-justify-content-flex-end is-align-content-center is-flex-wrap-wrap" style={{height: '100%'}}>
            {tableProps.row.original.types.map((n, key) => {
              return <PokemonType type={capitalize(n.type.name)} key={key} />;
            })}
          </div>
        )
      },
      {
        Header: "HP",
        accessor: "hp",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'hp')[0].base_stat}
        </div>)
      },
      {
        Header: "Attack",
        accessor: "attack",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'attack')[0].base_stat}
        </div>)
      },
      {
        Header: "Defense",
        accessor: "defense",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'defense')[0].base_stat}
        </div>)
      },
      {
        Header: "Special Attack",
        accessor: "special-attack",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'hp')[0].base_stat}
        </div>)
      },
      {
        Header: "Special Defense",
        accessor: "special-defense",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'defense')[0].base_stat}
        </div>)
      },
      {
        Header: "Speed",
        accessor: "speed",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'speed')[0].base_stat}
        </div>)
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

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 80,
      maxWidth: 200,
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
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
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
