var React = require('react');

var Item = require('./Item.jsx');

var ItemList = React.createClass({

    getInitialState: function(){
        return {activeItemId:null}
    },

    setActiveItem: function(id){
        this.setState({activeItemId: id});
    },

    render: function(){
        var items = this.props.items;
        var self = this;
        var itemNodes = items.map(function(item){
           return <Item key={item.id} item={item} active={self.state.activeItemId === item.id} onEdit={self.props.onEdit} onSelect={self.setActiveItem} />
        });

        return (
            <div className="item-list">
                {itemNodes}
            </div>
        )

    }
});

module.exports = ItemList;