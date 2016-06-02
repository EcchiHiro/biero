import React from 'react';
import ReactDOM from 'react-dom';

import Biere from '../Biere/Biere.jsx';

var ListeBiere = React.createClass({
    getInitialState : function(){
        return {data : [{"nom":"Vos bières sont en chargement","brasserie":"Chargement des brasseries","image":"../../dist/images/load.gif"}]}
            },
    componentDidMount : function(){
        setTimeout(this.rafraichir, 5000);
        
    },
    rafraichir : function()
    {
        //console.log('test');
        var req = new XMLHttpRequest();
        req.open('GET', 'http://127.0.0.1:8000/webservice/php/biere');
        req.onreadystatechange = function(evt){
            if(req.readyState == 4 && req.status == 200)
            {
               //console.log(req.responseText);
                //console.log(this);
                this.setState({data: JSON.parse(req.responseText)});        
            }
        }.bind(this);
        req.send();
        setTimeout(this.rafraichir, 5000);
    },
    render: function(){
        var noeudBiere = this.state.data.map(
            function(uneBiere, i)
            {
                if (uneBiere.image == "")
                {
                    uneBiere.image = "biereDefault.png"; 
                }
                
                return(<Biere position={i} key={i} image={uneBiere.image} nomBiere={uneBiere.nom}  brasserieBiere={uneBiere.brasserie} />);
                        
            });
        return(
            <div>
                <h1 className="titreSection">Liste des bières</h1>
                <section className="conteneur-flex">
                    {noeudBiere}
                </section>
            </div>
        )},
});


module.exports = ListeBiere;