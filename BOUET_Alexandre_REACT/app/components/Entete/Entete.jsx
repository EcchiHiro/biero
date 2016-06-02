import React from 'react';
import ReactDOM from 'react-dom';
import s from './Entete.scss';
import { Link } from 'react-router'

var Entete = React.createClass({
    render: function(){
        return (
            <header>
                <div className="logo"><img src="./images/logoBiere.svg" alt=""/></div>
                <nav className="menu">
                    <ul>
                        <li><Link to="/" activeClassName="active">Accueil</Link></li>
                        <li><Link to="/biere" activeClassName="active">Les bières</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
});

module.exports = Entete;