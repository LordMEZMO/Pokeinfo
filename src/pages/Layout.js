import React from 'react';
import NavLink from '../components/NavLink';
import {Outlet} from "react-router-dom";
import {FaHome} from 'react-icons/fa';

function Layout(){
    return (
        <>
            <header>PokeInfo</header>
            <nav>
                <ul>
                    <NavLink name="Pokemon List" link="/"/>
                    <NavLink name="Favourites" link="/favourites"/>
                    <NavLink name="Moves" link="/moves"/>
                    <NavLink name="Abilities" link="/abilities"/>
                    <NavLink name="Compare" link="/compare"/>
                    <NavLink name="News" link="/news"/>
                    <NavLink name="Register" link="/register"/>
                    <NavLink name="Login" link="/login"/>
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