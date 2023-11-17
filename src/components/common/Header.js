import React from "react";
import logoSrc from './logo.png'
import './Header.css'
import {Link} from 'react-router-dom'
import Search from "./Search";

const Header = () =>{
    return (
        <div className="Header">
            <Link to={'/?page=1'}>            
            <img src={logoSrc} className="Header-logo"/>
            </Link>
            <Search/>
        </div>
    )
}

export default Header