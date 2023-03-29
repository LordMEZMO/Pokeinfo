import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Pokedex from 'pokedex-promise-v2';
import ReactPaginate from 'react-paginate';
import SearchOptions from './SearchOptions';
import SortOptions from './SortOptions';

function Items({ currentItems }) {
  return (
    <div className='is-flex is-flex-wrap-wrap  is-align-content-space-evenly is-justify-content-space-evenly' style={{ gap: '10px' }}>
      {currentItems.map((p, k) => <PokemonCard name={p.name} link={p.url} key={k} />)}
    </div>
  )
}

function PaginatedItems({ items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  useEffect(() => {
    setItemOffset(0)
  },[items])

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
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
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
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
        <div className="select">
          <select onChange={(e) => setItemsPerPage(parseInt(e.target.value))} defaultValue={itemsPerPage}>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
          </select>
        </div>
      </div>
    </>
  );
}


export default function PokemonList() {
  const [pokeList, setPokeList] = useState([]);
  const [currentPokeList, setCurrentPokeList] = useState([])

  useEffect(() => {
    const pokedex = new Pokedex();
    pokedex.getPokemonsList().then((data) => {
      setPokeList(data.results)
      setCurrentPokeList(data.results)
    })
  }, []);

  const handleSearchByName = (e) => {
    let text = e.target.value.toLowerCase().trim()
    if(text == null || text === "") {
      setCurrentPokeList(pokeList)
    } else {
      setCurrentPokeList(pokeList.filter((pokemon) => pokemon.name.includes(text)))
    }
  }

  const handleSort = (e) => {
    let sortBy = e.target.options[e.target.selectedIndex].value
    console.log(sortBy)

    switch(sortBy){
      case "id":
        break;
      case "name":
        break;
      case "category":
        break;
      case "weight":
        break;
      case "height":
        break;
    }
  }


  return (
    <>
      <SearchOptions handleSearchByName={handleSearchByName}/>
      <SortOptions handleSort={handleSort}/>
      <PaginatedItems items={currentPokeList} />
    </>
  )
}
