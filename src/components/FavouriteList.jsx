import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { usePokemonSprite } from "../Helpers";

function FavouriteCard({data}){
    const {data: sprite, isLoading: isSpriteLoading} = usePokemonSprite(data.name)

    return (
        <div className="card">
            <div className="card-image is-flex is-align-items-center is-justify-content-center">               
                {!isSpriteLoading ?
					<figure className="image">
                    <img src={sprite} alt="" />
                </figure>:
					<LoadingSpinner />
				}
            </div>
            <div className="card-header is-flex-direction-column">
                <h5 className="card-header-title rows">
                    <a href={`/pokemon/${data.name}`}>{data.name}</a>
                </h5>
                <p className="tag">#{data.pokemonId}</p>
            </div>
        </div>
    );
}

function FavouriteList({data}){
    return (
        <div className="is-flex is-flex-wrap-wrap" style={{gap: 10}}>
            {data.map((pokemon, key) => {
                return <FavouriteCard data={pokemon} key={key}/>
            })}
        </div>
    )
}

export default FavouriteList;