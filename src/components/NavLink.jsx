import React from 'react';
import {Link} from "react-router-dom";

function NavLink({link, name}){
    return (
    <li className='navLink'>
        <Link to={link}>{name}</Link>
    </li>
    );
}

export default NavLink;