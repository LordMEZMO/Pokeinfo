import '../App.css';
import MovesList from '../components/MovesList';
import {useQueries, useQuery} from 'react-query'
import {convertMoveData, getMoveByName, getMovesList} from '../Helpers'

export default function Moves() {
	const {data} = useQuery({queryKey: 'movesList', queryFn: getMovesList})
	const movesList = data ?? []

	const movesData = useQueries(
		movesList.map((move) => {
			return {
				queryKey: ['move', `${move.name}`],
				queryFn: () => getMoveByName(move.name)
			};
		})
	);

	const allMovesData = movesData.filter((fetchedMove) => fetchedMove.isSuccess).map((fetchedMove) => fetchedMove.data)

	return (
		<div className="App">
			<section>
				<article>
					{
						movesData.filter(fetchedMove => fetchedMove.isSuccess).length === movesList.length ?
						<MovesList allMovesData={allMovesData}/> :
						'loading'
					}
				</article>
			</section>
		</div>
	);
}