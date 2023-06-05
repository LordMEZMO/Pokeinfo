import React, { useState, useEffect, useMemo, useReducer, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import ReactPaginate from 'react-paginate';
import SearchOptions from './SearchOptions';
import SortOptions from './SortOptions';

function Items({ currentItems, isShowStats }) {
	return (
		<div
			className='is-flex is-flex-wrap-wrap  is-align-content-space-evenly is-justify-content-space-evenly'
			style={{ gap: '10px' }}>
			{currentItems.map((p, k) => {
				return (
					<PokemonCard
						name={p.name}
						link={p.url}
						isShowStats={isShowStats}
						pokemonData={p}
						key={k}
					/>
				);
			})}
		</div>
	);
}

function PaginatedItems({ items, isShowStats }) {
	const [itemOffset, setItemOffset] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(100);
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;

		setCurrentItems(items.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(items.length / itemsPerPage));
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	}, [itemOffset, itemsPerPage, items]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<Items currentItems={currentItems} isShowStats={isShowStats} />
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

function PokemonList({ allPokemonsData }) {
	const [isShowStats, setIsShowStats] = useState(false);
	const [sortCriteria, setSortCriteria] = useState('id');
	const [sortOrder, changeSortOrder] = useReducer((checked) => !checked, false);
	const [searchText, setSearchText] = useState('')

	const pokemonsToDisplay = useMemo(() => {
		let filteredPokemons = [...allPokemonsData];
		// Filter by search text
		let text = searchText;
		if (text != null && text !== '') {
			filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.name.includes(text));
		}

		// Sort by sort criteria
		switch (sortCriteria) {
			case 'id':
				filteredPokemons = [...filteredPokemons].sort((a, b) => a.id - b.id);
				break;
			case 'name':
				filteredPokemons = [...filteredPokemons].sort((a, b) => a.name.localeCompare(b.name));
				break;
			default:
				break;
		}

		// Reverse if sort order is true
		if (sortOrder) {
			filteredPokemons = [...filteredPokemons].reverse();
		}

		return filteredPokemons;
	}, [allPokemonsData, sortCriteria, sortOrder, searchText]);

	const handleSearchByName = useCallback((e) => {setSearchText(e.target.value.toLowerCase().trim())}, []);

	const handleSort = useCallback((e) => {
		let sortBy = e.target.options[e.target.selectedIndex].value;
		setSortCriteria(sortBy);
	}, []);

	const handleShowStats = (e) => {
		setIsShowStats(e.target.checked);
	};

	return (
		<>
			<SearchOptions handleSearchByName={handleSearchByName} handleShowStats={handleShowStats} />
			<SortOptions
				handleSort={handleSort}
				handleSortOrder={changeSortOrder}
				sortOrderValue={sortOrder}
			/>
			<PaginatedItems items={pokemonsToDisplay} isShowStats={isShowStats} />
		</>
	);
}

const areEqual = (prevProps, nextProps) => {
	return prevProps.allPokemonsData === nextProps.allPokemonsData;
}

export default React.memo(PokemonList, areEqual)