import React from 'react'
import Korga2 from './Korga2.png'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function Navbar() {

    const auth = useSelector(state => state.auth)

    const logout = () => {
        window.localStorage.clear();
        window.location.replace("/")
    }

    // logout Links
    const LogoutOutLink = () => {
        return(
            <span type="button" className='btn btn-danger' onClick={logout}>Logout</span>
        )
    }

    // login Links
    const LoginedInLinks = () => {
        return(
            <>
             <Link to="/login" type="button" class="btn btn-primary">Login</Link>
            </>
        )
    }


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>


                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <a class="navbar-brand mt-2 mt-lg-0" href="/">
                            <img src={Korga2} alt="logo" />
                        </a>

                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#"></a>
                               
                            </li>
                         
                        </ul>

                    </div>
                    <div class="d-flex align-items-center">
                    {/* <Link to="/register" className='nav-link'>Register</Link> */}
                    {auth.authenticate ? LogoutOutLink():  LoginedInLinks()}

                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;