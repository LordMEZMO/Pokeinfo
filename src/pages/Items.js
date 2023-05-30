import '../App.css';
import { getItemsList, getAbilityByName } from '../Helpers';
import { useQueries, useQuery } from 'react-query';
import AbilitiesList from '../components/AbilitiesList';
import { useEffect } from 'react';

export default function Items(){
    useEffect(() => {
        (async() => {
            const items = await getItemsList()
            console.log(items)
        })()
    },[])

    // const {data} = useQuery({queryKey: 'abilityList', queryFn: getItemsList})
	// const itemsList = data ?? []
	// const abilitiesData = useQueries(
	// 	itemsList.map((item) => {
	// 		return {
	// 			queryKey: ['ability', `${item.name}`],
	// 			queryFn: () => getAbilityByName(item.name)
	// 		};
	// 	})
	// );
    
    // const fetchedItemsData = abilitiesData.filter((fetchedAbility) => fetchedAbility.isSuccess).map((fetchedAbility) => fetchedAbility.data)

    return (
        <div className="App">
          <section>
          <article>
            <h1>Items</h1>
            {/* {
                abilitiesData.filter(fetchedAbility => fetchedAbility.isSuccess).length === itemsList.length ?
                <AbilitiesList data={fetchedItemsData}/> :
                'loading'
            } */}
        </article>
          </section>
        </div>
    );
}