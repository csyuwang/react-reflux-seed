var React = require('react');

var Item = require('./Item.jsx');

var ItemList = React.createClass({
    render: function(){
        var items = this.props.items;

        var itemNodes = items.map(function(item){
           return <Item key={item._id} item={item} />
        });

        return (
            <div className="item-list">
                {itemNodes}
            </div>
        )

    }
});

module.exports = ItemList;