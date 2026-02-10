import React from "react";
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import './Home.css';

function Home() {
    const location = useLocation();
    return (
        <div className="home-section">
            <header className="navbar">
                <div className="logo-section">
                    <img src="/ateu.png" alt="ateu logo" className="logo-img" />
                </div>
                <div className="header-text">
                    <h1>Hello, {location.state.id}</h1>
                    <h2>welcome to the home</h2>
                </div>
                <nav>
                    <Link to="/">Logout</Link>
                </nav>
            </header>
        </div>
    )
}

export default Home;