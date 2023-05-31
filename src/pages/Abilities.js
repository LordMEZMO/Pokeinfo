import '../App.css';
import { getAbilitiesList, getAbilityByName } from '../Helpers';
import { useQueries, useQuery } from 'react-query';
import AbilitiesList from '../components/AbilitiesList';

export default function Abilities() {

  const {data} = useQuery({queryKey: 'abilitiesList', queryFn: getAbilitiesList})
	const abilitiesList = data ?? []
	const abilitiesData = useQueries(
		abilitiesList.map((ability) => {
			return {
				queryKey: ['ability', `${ability.name}`],
				queryFn: () => getAbilityByName(ability.name)
			};
		})
	);

  const fetchedAbilitiesData = abilitiesData.filter((fetchedAbility) => fetchedAbility.isSuccess).map((fetchedAbility) => fetchedAbility.data)

  return (
    <div className="App">
      <section>
        <article className='container'>
          	{
				abilitiesData.filter(fetchedAbility => fetchedAbility.isSuccess).length === abilitiesList.length ?
					<AbilitiesList data={fetchedAbilitiesData}/> :
					'loading'
			}	
        </article>
      </section>
    </div>
  );
}