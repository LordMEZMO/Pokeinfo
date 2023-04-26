import React, { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

function FavouriteList({data}){
    useEffect(() => {
        data.map(pokemon => {
            console.log(pokemon);
        })
    }, [])
    //return <pre>{JSON.stringify(data, null, 2)}</pre>
    return (
        <div className="is-flex is-flex-wrap-wrap" style={{gap: 10}}>
        {data.map(pokemon => {
            return (
                <div className="card">
                    <div className="card-image is-flex is-align-items-center is-justify-content-center">
                        <LoadingSpinner/>
                    </div>
                    <div className="card-header is-flex-direction-column">
                        <p className="card-header-title">{pokemon.name}</p>
                        <p className="tag">#{pokemon.pokemonId}</p>
                    </div>
                </div>
            );
        })}
        </div>
    )
}

export default FavouriteList;