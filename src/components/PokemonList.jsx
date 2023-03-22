import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Pokedex from 'pokedex-promise-v2';
import ReactPaginate from 'react-paginate';

function Items({currentItems}){
    return (
        <div className='is-flex is-flex-wrap-wrap  is-align-content-space-evenly' style={{gap: '10px'}}>
            {currentItems.map((p, k) => <PokemonCard name={p.name} link={p.url} key={k} />)}
        </div>
    )
}

function PaginatedItems({items, itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
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
              breakClassName='pagination-ellipsis'
            //   activeClassName='pagination-link'
              pageLinkClassName='pagination-link'
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
        </div>
      </>
    );
  }


export default function PokemonList() {
	const [pokeList, setPokeList] = useState([]);

	useEffect(() => {
        const pokedex = new Pokedex();
        pokedex.getPokemonsList().then((data) => {
            setPokeList(data.results)
            console.log(data.results);
        })
	}, []);

	return (
        <PaginatedItems itemsPerPage={100} items={pokeList}/>
    )
}
