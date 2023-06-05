import React from 'react'

function SearchOptions({ handleSearchByName, handleShowStats}) {
    return (
        <div>
            <div className="field">
                <div className="search control" style={{ width: "500px" }}>
                    <label className='label' htmlFor='searchBar'>Search by name: </label>
                    <input type="search" className='input' id='searchBar' onChange={handleSearchByName} />
                </div>
            </div>

            <div className='field'>
                <div className="control">
                    <label className='checkbox'>
                        <input type="checkbox" onChange={handleShowStats} />
                        <span className='px-1'>Show stats</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SearchOptions