import React from "react";
import { useMemo } from "react";
import PokemonType from "./PokemonType";
import Table from "./Table";
import { PokemonTableStyles } from "./styles/PokemonTableStyles";
import { Link } from "react-router-dom";

function PokemonTable({ allPokemonsData }) {
  let statColumnWidth = 90;

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
          <div className="name">
            <Link to={'pokemon/' + tableProps.row.original.name} className="capitalized">
              {tableProps.row.original.name}
            </Link>
          </div>
        )
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: (tableProps) => (
          <div className="is-flex is-justify-content-flex-end is-align-content-center is-flex-wrap-wrap" style={{height: '100%'}}>
            {tableProps.row.original.types.map((n, key) => {
              return <PokemonType type={n.type.name} key={key} />;
            })}
          </div>
        )
      },
      {
        Header: "HP",
        accessor: "hp",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'hp')[0].base_stat}
        </div>),
        width: statColumnWidth
      },
      {
        Header: "Attack",
        accessor: "attack",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'attack')[0].base_stat}
        </div>),
        width: statColumnWidth
      },
      {
        Header: "Defense",
        accessor: "defense",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'defense')[0].base_stat}
        </div>),
        width: statColumnWidth
      },
      {
        Header: "Special Attack",
        accessor: "special-attack",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'hp')[0].base_stat}
        </div>),
        width: statColumnWidth
      },
      {
        Header: "Special Defense",
        accessor: "special-defense",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'defense')[0].base_stat}
        </div>),
        width: statColumnWidth
      },
      {
        Header: "Speed",
        accessor: "speed",
        Cell: (tableProps) => (<div className="stat">
          {tableProps.row.original.stats.filter((statEntry) => statEntry.stat.name === 'speed')[0].base_stat}
        </div>),
        width: statColumnWidth
      },
    ],
    []
  );

  return (
    <PokemonTableStyles>
      <Table columns={columns} data={allPokemonsData} rowHeight={100}/>
    </PokemonTableStyles>
  );
}

export default PokemonTable;
