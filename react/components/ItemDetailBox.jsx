var React = require('react');
var ItemDetail = require('./ItemDetail.jsx');
var ItemActions = require('../../actions/ItemActions.js');
var ItemStore = require('../../stores/ItemStore.js');

var ItemDetailBox = React.createClass({
    handleSave:function(item){
        if(item.id){
            ItemActions.editItem(item);
        }
        else{
            ItemActions.createItem(item);
        }
    },

    render: function(){
        var item;
        item = ItemStore.getItem(this.props.id);

        return (
            <div className="content-main">
                <h4>编辑信息</h4>
                <ItemDetail item={item} onSave={this.handleSave} />
            </div>
        )
    }
});

module.exports = ItemDetailBox;