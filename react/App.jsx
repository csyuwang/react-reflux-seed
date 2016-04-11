var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/ItemList.jsx');

var products = [
    {_id:1, category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {_id:2, category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {_id:3, category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {_id:4, category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {_id:5, category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {_id:6, category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

if (typeof window !== 'undefined') {
    window.onload = function() {
        ReactDOM.render(<App items={products}  />, document.getElementById('app'));
    }
}