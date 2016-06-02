import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router'
import App from './App/App.jsx';
import s from './style.scss';



window.addEventListener('load', function () {
    // En cas de besoin pour initialiser des paramètres.
});

ReactDOM.render(<App />, document.getElementById('app'));
