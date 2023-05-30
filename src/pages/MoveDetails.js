import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useMoveData } from "../Helpers";
import { MoveDetailsStyles } from "../components/styles/MoveDetailsStyles";
import PokemonType from "../components/PokemonType";

function MoveDetails() {
  let { name } = useParams();
  let { data, isLoading } = useMoveData(name);

  console.log(data);
  return !isLoading ? (
    <MoveDetailsStyles>
      <section className="section">
        <div className="columns">
          <div className="column">
            <h1 className="title capitalized">
              <span>{name}</span>
              <span className="tag">#{data.id}</span>
            </h1>
            <h2 className="subtitle">
              <PokemonType type={data.type.name} />
            </h2>
            <div className="block">
              <p className="desc">
                {data.effect_entries[0].effect}
              </p>
            </div>
            <div className="block">
              <h2 className="title is-4">Learned by</h2>
              <div>
                {data.learned_by_pokemon.map(pokemon => <p className="capitalized">{pokemon.name}</p>)}
              </div>
            </div>
          </div>
          <div className="column">
            <table className="table box">
              <thead>
                <tr>
                  <th>Accuracy</th>
                  <th>Damage class</th>
                  <th>Effect</th>
                  <th>Effect chance</th>
                  <th>Power</th>
                  <th>PP</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.accuracy}</td>
                  <td>{data.damage_class.name}</td>
                  <td>{data.contest_type.name}</td>
                  <td>{data.effect_chance}</td>
                  <td>{data.power}</td>
                  <td>{data.pp}</td>
                  <td>{data.target.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </MoveDetailsStyles>
  ) : (
    "loading"
  );
}

export default MoveDetails;
