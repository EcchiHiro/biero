import React from 'react';
import ReactDOM from 'react-dom';

var Biere = React.createClass({
    clic : function(){
        console.log('clic sur : '+  this.props.position);
    },
    
   render : function(){
       return (
        <div onClick={this.clic} className="item-flex"> 
            <div className="biere">
               <img src={"./images/" + this.props.image}></img>
                <div className="item-description">
                    <h1>Nom : {this.props.nomBiere}</h1>    
                    <p>Brasserie : {this.props.brasserieBiere}</p>
                </div>
            </div>
        </div>
       );
   }, 
    
});


module.exports = Biere;