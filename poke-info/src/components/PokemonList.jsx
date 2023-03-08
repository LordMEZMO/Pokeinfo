import React from 'react';

export default function PokemonList({name, link, key}){
    return (
    <li className='pokemonList'>
        <a key={key} href={link}>{name}</a>
    </li>
    );
}