import React from 'react';
import ReactDOM from 'react-dom';


import Entete from '../Entete/Entete.jsx';

import ListeBiere from '../ListeBiere/ListeBiere.jsx';

import s from './PageBiere.scss';

import {Link, hashHistory} from 'react-router';

var PageBiere = React.createClass({
    render : function(){
        return (
            <div className="pageListeBiere">
                <Entete />
                <div className="contenu">
                      <ListeBiere />
                </div>
            </div>
            
        );
    }
});

module.exports = PageBiere;