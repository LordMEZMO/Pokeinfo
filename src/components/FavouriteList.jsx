import React from "react";
import LoadingSpinner from "./LoadingSpinner";

function FavouriteList({data}){
    return (
        <div className="is-flex is-flex-wrap-wrap" style={{gap: 10}}>
            {data.map((pokemon, key) => {
                return (
                    <div className="card" key={key}>
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