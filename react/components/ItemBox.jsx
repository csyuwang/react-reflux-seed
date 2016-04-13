var React = require('react');
var ItemListBox=require('./ItemListBox.jsx');
var ItemDetailBox=require('./ItemDetailBox.jsx');

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
        return (
            <div className="container">
                <div className="wrapper header">
                    <div className="page-header">
                        <h1>Item Box</h1>
                    </div>
                </div>
                <div className="row">
                    <ItemListBox onEdit={this.onEdit} onAdd={this.onAdd} />
                    <ItemDetailBox id={this.state.currentlyEdited}  />
                </div>
            </div>
        )
    }
});

module.exports = ItemBox;