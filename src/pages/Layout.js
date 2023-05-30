import React from 'react';
import NavLink from '../components/NavLink';
import {Outlet} from "react-router-dom";
import {FaHome, FaHeart, FaList, FaListUl, FaSitemap, FaNewspaper, FaUserPlus, FaUserCircle} from 'react-icons/fa';

function Layout(){
    const iconSize = 32;
    return (
        <>
            <header><NavLink name="Pokeinfo" link="/"/></header>
            <nav>
                <ul>
                    <NavLink name="Pokemon List" link="/" icon={<FaHome size={iconSize}/>}/>
                    <NavLink name="Favourites" link="/favourites" icon={<FaHeart size={iconSize}/>}/>
                    <NavLink name="Moves" link="/moves" icon={<FaList size={iconSize}/>}/>
                    <NavLink name="Abilities" link="/abilities" icon={<FaListUl size={iconSize}/>}/>
                    <NavLink name="Items" link="/items" icon={<FaListUl size={iconSize}/>}/>
                    <NavLink name="Compare" link="/compare" icon={<FaSitemap size={iconSize}/>}/>
                    <NavLink name="News" link="/news" icon={<FaNewspaper size={iconSize}/>}/>
                    <NavLink name="Register" link="/register" icon={<FaUserPlus size={iconSize}/>}/>
                    <NavLink name="Login" link="/login" icon={<FaUserCircle size={iconSize}/>}/>
                </ul>
            </nav>
            <Outlet />
            <footer>
                &copy; PokeInfo 2023
            </footer>
        </>
    );
}

export default Layout;