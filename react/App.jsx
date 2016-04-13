var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/ItemBox.jsx');


if (typeof window !== 'undefined') {
    window.onload = function() {
        ReactDOM.render(
            <App itemSource="./items.json" ownerSource="./owners.json" idName="id" showName="name" ownerName="category" />,
            document.getElementById('app')
        );
    }
}