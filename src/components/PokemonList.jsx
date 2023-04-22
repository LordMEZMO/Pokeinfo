import React, { useState, useEffect, useMemo } from 'react';
import PokemonCard from './PokemonCard';
import Pokedex from 'pokedex-promise-v2';
import ReactPaginate from 'react-paginate';
import SearchOptions from './SearchOptions';
import SortOptions from './SortOptions';
import { useQuery, useQueryClient } from 'react-query';

function Items({ currentItems, isShowStats }) {
	return (
		<div
			className='is-flex is-flex-wrap-wrap  is-align-content-space-evenly is-justify-content-space-evenly'
			style={{ gap: '10px' }}>
			{currentItems.map((p, k) => (
				<PokemonCard
					name={p.name}
					link={p.url}
					isShowStats={isShowStats}
					key={k}
				/>
			))}
		</div>
	);
}

function PaginatedItems({ items, isShowStats }) {
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(100);

	useEffect(() => {
		setItemOffset(0);
	}, [items]);

	// Simulate fetching items from another resources.
	// (This could be items from props; or items loaded in a local state
	// from an API endpoint with useEffect and useState)
	const endOffset = itemOffset + itemsPerPage;
	console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	const currentItems = items.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(items.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
	};

	return (
		<>
			<Items
				currentItems={currentItems}
				isShowStats={isShowStats}
			/>
			<div className='pagination'>
				<ReactPaginate
					breakLabel='...'
					nextLabel='next >'
					containerClassName='pagination-list'
					nextLinkClassName='pagination-next'
					previousLinkClassName='pagination-previous'
					activeLinkClassName='is-current'
					breakClassName='pagination-ellipsis'
					pageLinkClassName='pagination-link'
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					marginPagesDisplayed={1}
					pageCount={pageCount}
					previousLabel='< previous'
					renderOnZeroPageCount={null}
				/>
				<div className='select'>
					<select
						onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
						defaultValue={itemsPerPage}>
						<option value='50'>50</option>
						<option value='100'>100</option>
						<option value='500'>500</option>
					</select>
				</div>
			</div>
		</>
	);
}

const getPokemonsList = () => {
	const pokedex = new Pokedex()
	return pokedex.getPokemonsList().then(data => data.results)
}

export default function PokemonList() {
	const {isLoading, data} = useQuery({queryKey: 'pokemonList', queryFn: getPokemonsList});
	const pokeList = data ?? []
	const [currentPokeList, setCurrentPokeList] = useState(data ?? []);
	const [isShowStats, setIsShowStats] = useState(false);
	const [sortCriteria, setSortCriteria] = useState(null);

	useEffect(()=> {
		setCurrentPokeList(pokeList)
	}, [isLoading])

	const updatePokeList = (newValue) => {
		pokeList[pokeList.map((pokemon) => pokemon.name).indexOf(newValue.name)] = newValue;
	};

	const handleSearchByName = (e) => {
		let text = e.target.value.toLowerCase().trim();
		if (text == null || text === '') {
			setCurrentPokeList(pokeList);
		} else {
			setCurrentPokeList(pokeList.filter((pokemon) => pokemon.name.includes(text)));
		}
	};

	useMemo(() => {
		console.log(sortCriteria);
		switch (sortCriteria) {
			case 'id':
				setCurrentPokeList(
				  pokeList.sort(async (a,b) => {
						return a.id - b.id;
				  }))
				break;
			case 'name':
				setCurrentPokeList(
					pokeList.sort((a, b) => {
						if (a.name < b.name) return -1;
						if (a.name > b.name) return 1;
						return 0;
					})
				);
				break;
			case 'category':
				setCurrentPokeList(pokeList);
				break;
			case 'weight':
				break;
			case 'height':
				break;
		}
	}, [sortCriteria]);

	const handleSort = (e) => {
		let sortBy = e.target.options[e.target.selectedIndex].value;
		setSortCriteria(sortBy);
	};

	const handleShowStats = (e) => {
		setIsShowStats(e.target.checked);
	};

	return (
		<>
			<SearchOptions handleSearchByName={handleSearchByName} handleShowStats={handleShowStats} />
			<SortOptions handleSort={handleSort} />
			<PaginatedItems
				items={currentPokeList}
				isShowStats={isShowStats}
			/>
		</>
	);
}
