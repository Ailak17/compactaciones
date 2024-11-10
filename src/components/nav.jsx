import '../styles/nav.css'
import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
    return (
        <div>
            <nav>
                <ul>
                    <li><NavLink to="/inicio" className={({isActive}) => isActive ? "activo" : undefined}>Inicio</NavLink></li>
                    <li><NavLink to="/carga" className={({isActive}) => isActive ? "activo" : undefined}>Carga</NavLink></li>
                    <li><NavLink to="/busqueda" className={({isActive}) => isActive ? "activo" : undefined}>Busqueda</NavLink></li>
                </ul>
            </nav>
        </div>

    );
}
export default Nav;