import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Entete from '../Entete/Entete.jsx';
import s from './Accueil.scss';

var Accueil = React.createClass({
    render: function(){
        return (
            <div className="pageAccueil">
                <Entete />
                <div className="contenu">
                <h1>Bienvenue sur notre application !</h1>
                    <div  id="presentation">
                        <img src="./images/ireland.png" alt="" id="lutinImg"/>
                        <span>Partagez avec tout les internautes votre avis sur les bieres que vous avez gouté, ou trouver votre prochaine bière à tester parmis les mieux notées sur le site</span>
                    </div>
                    <div className="bandeau">
                        <Link to="/biere" className="btnAction">Notre sélection de bière</Link>
                    </div>
                    <div className="arguments">
                        <div id="argument1"><img src="../dist/images/beerTaps.jpg" alt=""/><p>Goutez !</p></div>
                        <div id="argument2"><img src="../dist/images/Irish-Beers.png" alt=""/><p>Notez !</p></div>
                        <div id="argument3"><img src="../dist/images/beerTaps.jpg" alt=""/><p>Goutez encore !</p></div>
                    </div>

                </div>
            </div>
        )
    }
});

module.exports = Accueil;