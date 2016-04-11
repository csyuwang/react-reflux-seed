/**
 * Created by yu on 2016/4/11.
 */

var Reflux = require('reflux');
var ItemActions = require('../actions/ItemActions');

var _items = [];

var ItemStore = Reflux.createStore({

    init: function() {
        this.listenTo(ItemActions.createItem, this.onCreate);
        this.listenTo(ItemActions.editItem, this.onEdit);
    },

    onCreate: function(item) {
        _items.push(item);
        this.trigger(_items);
    },

    onEdit: function(item) {
        for(var i=0;i<_items.length;i++){
            if(_items[i]._id===item._id){
                /*TODO edit item content*/
                this.trigger(_items);
                break;
            }
        }
    },

    getItems:function(){
        return _items;
    },

    getItem:function(id){
        for(var i=0;i<_items.length;i++){
            if(_items[i]._id===id){
                return _items[i];
            }
        }
    }
});

module.exports = ItemStore;