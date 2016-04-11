var React = require('react');

var Item = React.createClass({
    render: function(){
        var item = this.props.item;

        return (
            <a className="item">{item.name}</a>
        )
    }
});

module.exports = Item;
