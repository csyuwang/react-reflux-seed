/**
 * Created by yu on 2016/4/11.
 */

var Reflux = require('reflux');
var ItemActions = require('../actions/ItemActions');

var _items = [
    {id:1, name: "Football", category: "Sporting Goods", price: "$49.99", stocked: true},
    {id:2, name: "Baseball", category: "Sporting Goods", price: "$9.99", stocked: true},
    {id:3, name: "Basketball", category: "Sporting Goods", price: "$29.99", stocked: false},
    {id:4, name: "iPod Touch", category: "Electronics", price: "$99.99", stocked: true},
    {id:5, name: "iPhone 5", category: "Electronics", price: "$399.99", stocked: false},
    {id:6, name: "Nexus 7", category: "Electronics", price: "$199.99", stocked: true}
];

var _newItem = {id: undefined, name: '', category: '', price: '', stocked: ''};

var ItemStore = Reflux.createStore({

    init: function() {
        this.listenTo(ItemActions.createItem, this.onCreate);
        this.listenTo(ItemActions.editItem, this.onEdit);
    },

    onCreate: function(item) {
        /*TODO save item*/
        item.id = Date.now();
        _items.push(item);

        this.trigger(_items);
    },

    onEdit: function(item) {
        for(var i=0;i<_items.length;i++){
            if(_items[i].id === item.id){
                /*TODO edit item content and save*/
                _items[i] = item;
                this.trigger(_items);
                break;
            }
        }
    },

    getItems: function(){
        return _items;
    },

    getItem: function(id){
        for(var i=0;i<_items.length;i++){
            if(_items[i].id === id){
                return _items[i];
            }
        }
        return _newItem;
    },

    getNewItem: function(){
        return _newItem;
    }

});

module.exports = ItemStore;