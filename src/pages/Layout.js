import React from 'react';
import NavLink from '../components/NavLink';
import {Outlet, Link} from "react-router-dom";

function Layout(){
    return (
        <>
            <nav>
                <ul>
                    <NavLink name="Pokemon List" link="/"/>
                    <NavLink name="Favourites" link="/"/>
                    <NavLink name="Compare" link="/"/>
                    <NavLink name="News" link="/"/>
                    <NavLink name="Register" link="/"/>
                    <NavLink name="Login" link="/"/>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;