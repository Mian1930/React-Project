import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../../Images/Logo.png";

const Navbar = () => {
    return ( 
        <>
        <nav className="navbar navbar-light  navbar-expand-md bg-transparent">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"><img src={Logo} alt="Next Capital" /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" to="/">Product</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" to="/">About</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link text-white" to="/">APC</NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            
                        <button class ="btn text-white bodr-white" type ="button">LOGIN</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
     );
}
 
export default Navbar;