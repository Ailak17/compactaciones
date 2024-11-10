import '../styles/header.css'
import React from "react";
const Header = (props) => {
    return(
        <header>
            <div className="holder">
                <img src="/images/logoblanco.png" width="200" alt="Transportes x"/>
                <h1>Sistema de compactación de la Provincia de Buenos Aires</h1>
            </div>

        </header>
        
    );
}
export default Header;