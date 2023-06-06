import React from 'react'
import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

function TableFilter({ preFilteredRows, filter, setFilter }) {
    const count = preFilteredRows.length
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => { setFilter(value || undefined) }, 200)

    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal" style={{textAlign: 'left'}}>
                <label className="label">Search:{' '}</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <p className="control">
                        <input
                            id='search'
                            className='input is-link'
                            type='text'
                            value={value || ""}
                            onChange={e => {
                                setValue(e.target.value);
                                onChange(e.target.value);
                            }}
                            placeholder={`${count} records...`}
                        />
                    </p>
                </div>
            </div>
        </div>
       
    )
}

export default TableFilter