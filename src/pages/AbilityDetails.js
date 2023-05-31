import React from "react";
import { AbilityDetailsStyles } from "../components/styles/AbilityDetailsStyles";
import { useParams } from "react-router-dom";
import { useAbilityData } from "../Helpers";
import { GenerationTag } from "../components/GenerationTag";
import Table from "../components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function AbilityDetails() {
  let { name } = useParams();
  let { data, isLoading } = useAbilityData(name);

  const PokemonLink = ({ name }) => {
    return (
      <div className="capitalized">
        <Link to={"../pokemon/" + name}>
          {name}
        </Link>
      </div>
    );
  };

  const columns = React.useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: (tableProps) => (<PokemonLink name={tableProps.row.original.pokemon.name}/>)
    },
    {
      Header: 'Is Hidden',
      accessor: 'is_hidden',
      Cell: (tableProps) => (<div className="center">{tableProps.row.original.is_hidden ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faX}/>}</div>)
    }
  ], [])

  console.log(data);
  return (
    <AbilityDetailsStyles>
      {isLoading ? (
        "loading"
      ) : (
        <section className="section container">
          <div className="columns">
            <div className="column">
              <div className="block">
                <h1 className="title capitalized">{name}</h1>
                <div className="subtitle">
                  <span className="tag">#{data.id}</span>
                  <GenerationTag generation={data.generation.name}/>
                  {data.is_main_series ? <span className="tag is-success">Main series</span> : ''}
                </div>
              </div>
              <div className="block">
                { data.effect_entries.find(entry => entry.language.name === 'en').effect}
              </div>
            </div>
            <div className="column">
              <h2 className="title is-4">Used by</h2>
              <div className="box">
                <Table columns={columns} data={data.pokemon} rowHeight={50} />
              </div>
            </div>
          </div>
        </section>
      )}
    </AbilityDetailsStyles>
  );
}

export default AbilityDetails;
