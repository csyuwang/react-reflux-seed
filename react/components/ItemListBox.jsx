var React = require('react');

var ItemOwners = require('./ItemOwners.jsx');
var ItemList = require('./ItemList.jsx');
var ItemStore = require('../../stores/ItemStore.js');

var owners =  [
    {id:1, category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {id:2, category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {id:3, category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {id:4, category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {id:5, category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {id:6, category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var labelText = '类别名';

var ItemListBox = React.createClass({

    getInitialState: function(){
        return {items: ItemStore.getItems()}
    },

    onChange: function(items) {
        this.setState({items: items})
    },

    componentDidMount: function(){
        this.unsubscribe = ItemStore.listen(this.onChange)
    },

    componentWillUnmount: function(){
        this.unsubscribe();
    },

    onAdd: function(event){
        event.preventDefault();
        this.props.onAdd();
        this.refs.itemList.setActiveItem(null);
    },

    render: function(){
        return (
            <div className="sidebar">
                <ItemOwners labelText={labelText} owners={owners}  />
                <ItemList ref="itemList" items={this.state.items} onEdit={this.props.onEdit} />
                <button type="button" className="add-button" onClick={this.onAdd}>添加新项</button>
            </div>
        )
    }
});

module.exports = ItemListBox;

