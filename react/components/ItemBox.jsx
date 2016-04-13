var React = require('react');
var ItemListBox=require('./ItemListBox.jsx');
var ItemDetailBox=require('./ItemDetailBox.jsx');

var ItemStore = require('../../stores/ItemStore.js');

var ItemBox = React.createClass({

    getInitialState: function(){
        return {currentlyEdited: null}
    },

    onEdit: function(id){
        this.setState({currentlyEdited: id});
    },

    onAdd: function(){
        this.setState({currentlyEdited: null});
    },

    render: function() {
        ItemStore.configNames(this.props.idName,this.props.showName,this.props.ownerName);
        return (
            <div className="container">
                <div className="wrapper header">
                    <div className="page-header">
                        <h1>Item Box</h1>
                    </div>
                </div>
                <div className="row">
                    <ItemListBox onEdit={this.onEdit} onAdd={this.onAdd} onSelectOwner={this.onAdd} itemSource={this.props.itemSource} ownerSource={this.props.ownerSource} />
                    <ItemDetailBox id={this.state.currentlyEdited}  />
                </div>
            </div>
        )
    }
});

module.exports = ItemBox;