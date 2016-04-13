var React = require('react');

var ItemOwners = require('./ItemOwners.jsx');
var ItemList = require('./ItemList.jsx');
var ItemActions = require('../../actions/ItemActions');
var ItemStore = require('../../stores/ItemStore.js');

var labelText = '类别名';

var ItemListBox = React.createClass({

    getInitialState: function(){
        return {items: [], currentlySelected: -1};
    },

    filterItems: function(allItems,ownerId) {
        if(ownerId == -1) {
            return allItems;
        } else {
            var filtered = allItems.filter(function (item) {
                return item.owner == ownerId;
            }.bind(this));
            return filtered;
        }
    },

    onChange: function(items) {
        var filtered = this.filterItems(items,this.state.currentlySelected);
        this.setState({items: filtered});
    },

    componentDidMount: function(){
        this.unsubscribe = ItemStore.listen(this.onChange);
        ItemActions.loadItems(this.props.itemSource);
    },

    componentWillUnmount: function(){
        this.unsubscribe();
    },

    onAdd: function(event){
        event.preventDefault();
        this.props.onAdd();
        this.refs.itemList.setActiveItem(null);
    },

    handleSelectOwner: function(ownerId) {
        var filtered = this.filterItems(ItemStore.getItems(), ownerId);
        this.setState({items: filtered});
        this.setState({currentlySelected: ownerId});
        this.props.onSelectOwner();
        this.refs.itemList.setActiveItem(null);
    },

    handleLoadOwner: function(id) {
        this.setState({currentlySelected: id});
    },

    render: function(){
        return (
            <div className="sidebar">
                <ItemOwners labelText={labelText} source={this.props.ownerSource} currentlySelected={this.state.currentlySelected}
                            onSelectOwner={this.handleSelectOwner} onLoadOwner={this.handleLoadOwner}  />
                <ItemList ref="itemList" items={this.state.items} onEdit={this.props.onEdit} />
                <button type="button" className="add-button" onClick={this.onAdd}>添加新项</button>
            </div>
        )
    }
});

module.exports = ItemListBox;

