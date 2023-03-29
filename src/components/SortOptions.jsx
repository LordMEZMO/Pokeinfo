import React from 'react'

function SortOptions({ handleSort }) {
    return (
        <>
            <label className='label' htmlFor='sortSelect'>Sort: </label>
            <div className="select is-normal" id='sortSelect' style={{ width: "500px" }}>
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
        </>
    )
}

export default SortOptions