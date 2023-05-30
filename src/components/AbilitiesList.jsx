import React from 'react';
import { useMemo } from 'react';
import { AbilitiesListStyles } from './styles/AbilitiesListStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from './Table';
import { Link } from 'react-router-dom';


function AbilitiesList({ data }) {
    const AbilityDesc = ({abilityData}) => {
      if(abilityData.effect_entries.length > 0)
      {
        return abilityData.effect_entries.find(entry => entry.language.name === "en").short_effect
      } else if (abilityData.flavor_text_entries.length > 0) {
        return abilityData.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text
      }

      return ''
    }

    const IsMainSeriesIcon = ({value}) => {
      let icon = value ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faXmark}/>
      
      return (
        <div className='centerXY'>
          {icon}
        </div>
      )
    }

    const Generation = ({value}) => {
      let generation = value.name.replace('generation-', '').toUpperCase();
      return <span className="centerXY">{generation}</span>
    }

    const AbilityName = ({value}) => (<Link to={"/../ability/" + value} className='capitalize'>{value.replace('-', ' ')}</Link>)

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: 'id',
            width: 60
        },
        {
            Header: "Name",
            accessor: 'name',
            Cell: (tableProps) => <AbilityName value={tableProps.row.original.name}/>
        },
        {
            Header: "Description",
            accessor: 'desc',
            Cell: (tableProps) => (
                <div className='centerY'>
                    <AbilityDesc abilityData={tableProps.row.original} />
                </div>
            ),
            width: 450
        },
        {
          Header: "Generation",
          accessor: 'generation',
          Cell: (tableProps) => (<Generation value={tableProps.row.original.generation}/>),
          width: 90
        },
        {
          Header: 'Is Main Series',
          accessor: 'is_main_series',
          Cell: (tableProps) => (<IsMainSeriesIcon value={tableProps.row.original.is_main_series}/>)
        }
    ])

	return (
	<AbilitiesListStyles>
		<Table columns={columns} data={data}/>
	</AbilitiesListStyles>
	)
}
export default React.memo(AbilitiesList);
