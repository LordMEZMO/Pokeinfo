import React from 'react'

function SearchOptions({ handleSearchByName }) {
    return (
        <div className="search control" style={{ width: "500px" }}>
            <label className='label' htmlFor='searchBar'>Search by name: </label>
            <input type="search" className='input' id='searchBar' onChange={handleSearchByName} />
        </div>
    )
}

export default SearchOptions