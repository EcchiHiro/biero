import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import Entete from '../Entete/Entete.jsx';
import Accueil from '../Accueil/Accueil.jsx';
import Biere from '../Biere/Biere.jsx';
import ListeBiere from '../ListeBiere/ListeBiere.jsx';

import PageBiere from '../PageBiere/PageBiere.jsx';

/* Ajouter vos importations...*/

var App = React.createClass({
    nouvelleRoute: function(p1, p2){
        //console.log(p1, p2);
        window.scrollTo(0,0);
    },
    render : function(){
        return (
            <section>
                <Router history={hashHistory}>
                    <Route path="/" component={Accueil} onEnter={this.nouvelleRoute} />
                    <Route path="/biere" component={PageBiere} onEnter={this.nouvelleRoute} />
                    <Route path="*" component={Accueil} onEnter={this.nouvelleRoute} />
                </Router>
            </section>
        );
    }
});

module.exports = App;
