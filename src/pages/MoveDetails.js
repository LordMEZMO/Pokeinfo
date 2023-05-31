import React from "react";
import { Link, useParams } from "react-router-dom";
import { useMoveData } from "../Helpers";
import { MoveDetailsStyles } from "../components/styles/MoveDetailsStyles";
import PokemonType from "../components/PokemonType";
import Table from "../components/Table";
import { GenerationTag } from "../components/GenerationTag";

function MoveDetails() {
  let { name } = useParams();
  let { data, isLoading } = useMoveData(name);

  const PokemonLink = ({ name }) => {
    return (
      <div className="capitalized">
        <Link to={"../pokemon/" + name}>
          {name}
        </Link>
      </div>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (tableProps) => (
          <PokemonLink name={tableProps.row.original.name} />
        ),
      },
    ],
    []
  );

  console.log(data);
  return !isLoading ? (
    <MoveDetailsStyles>
      <section className="section container">
        <div className="columns">
          <div className="column">
            <h1 className="title capitalized">
              <span>{name}</span>
            </h1>
            <h2 className="subtitle">
              <span className="tag">#{data.id}</span>
              <PokemonType type={data.type.name} />
              <GenerationTag generation={data.generation.name} />
            </h2>
            <div className="block">
              <p className="desc">
                {
                  data.effect_entries.find(
                    (desc) => desc.language.name === "en",
                    "undef"
                  ).effect
                }
              </p>
            </div>
            <div className="block">
              <h2 className="title is-4">Learned by</h2>
              <div className="box">
                <Table
                  columns={columns}
                  data={data.learned_by_pokemon.map((pok) => pok)}
                  rowHeight={50}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <h2 className="title is-4">Stats</h2>
            <div className="box">
              <table className="table">
                <tr>
                  <th>Accuracy</th>
                  <td>{data.accuracy}</td>
                </tr>
                <tr>
                  <th>Damage class</th>
                  <td>{data.damage_class.name}</td>
                </tr>
                <tr>
                  <th>Effect</th>
                  <td>{data.contest_type ? data.contest_type.name : ""}</td>
                </tr>
                <tr>
                  <th>Effect chance</th>
                  <td>{data.effect_chance}</td>
                </tr>
                <tr>
                  <th>Power</th>
                  <td>{data.power}</td>
                </tr>
                <tr>
                  <th>PP</th>
                  <td>{data.pp}</td>
                </tr>
                <tr>
                  <th>Target</th>
                  <td>{data.target.name}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </MoveDetailsStyles>
  ) : (
    "loading"
  );
}

export default MoveDetails;
