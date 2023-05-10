import React from 'react';
import {Link} from "react-router-dom";

function NavLink({link, name, icon=null}){
    return (
        <li className='navLink'>
            <Link to={link} className='is-flex is-align-items-center'>{icon}{name}</Link>
        </li>
    );
}

export default NavLink;