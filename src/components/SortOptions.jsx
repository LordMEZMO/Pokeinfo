import React from 'react'
import SortOrderCheckbox from './SortOrderCheckbox'

function SortOptions({ handleSort, handleSortOrder, sortOrderValue }) {
    return (
        <div className='is-inline-flex'>
            <div>
                <label className='label' htmlFor='sortSelect'>Sort: </label>
                <div className='is-flex'>
                    <div className="select is-normal mr-2" id='sortSelect ' >
                        <select onChange={handleSort}>
                            <optgroup label="Default">
                                <option value="id">Id</option>
                                <option value="name">Name (A-Z)</option>
                                <option value="category">Category (A-Z)</option>
                                <option value="weight">Weight</option>
                                <option value="height">Height</option>
                            </optgroup>
                            <optgroup label="Stats">
                                <option value="hp">HP</option>
                                <option value="attack">Attack</option>
                                <option value="defense">Defense</option>
                                <option value="s_attack">Special attack</option>
                                <option value="s_defense">Special defense</option>
                                <option value="speed">Speed</option>
                            </optgroup>
                        </select>
                    </div>
                    <SortOrderCheckbox handleSortOrder={handleSortOrder} value={sortOrderValue}/>
                </div>
            </div>
        </div>
    )
}

export default SortOptions