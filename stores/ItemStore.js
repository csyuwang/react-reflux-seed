/**
 * Created by yu on 2016/4/11.
 */

var Reflux = require('reflux');
var ItemActions = require('../actions/ItemActions');

var _items = [];
var _newItem = {};
var _idName, _showName, _ownerName;

var ItemStore = Reflux.createStore({

    init: function() {
        this.listenTo(ItemActions.createItem, this.onCreate);
        this.listenTo(ItemActions.editItem, this.onEdit);
        this.listenTo(ItemActions.loadItems, this.load);
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

    load: function(src) {
        $.ajax({
            url: src,
            dataType: 'json',
            cache: false,
            success: function(items) {
                _newItem = this.getNewItem(items[0]);
                _items = this.transform(items);
                this.trigger(_items);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(src, status, err.toString());
            }.bind(this)
        });
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

    getNewItem: function(item){
        if(item) {
            var ret = {};
            Object.keys(item).forEach(function(key){
                if (key === _idName) {
                    ret.id = undefined;
                }
                else if (key === _showName) {
                    ret.name = '';
                }
                else if (key === _ownerName) {
                    ret.owner = '';
                }
                else {
                    ret[key] = '';
                }
            });
            return ret;
        } else {
            return _newItem;
        }
    },

    transform: function(items){
        return items.map(function(item){
            return this.convert(item);
        }.bind(this));
    },

    convert: function(item){
        var _item = {};
        Object.keys(item).forEach(function(key){
            if (key === _idName) {
                _item.id = item[key];
            }
            else if (key === _showName) {
                _item.name = item[key];
            }
            else if (key === _ownerName) {
                _item.owner = item[key];
            }
            else {
                _item[key] = item[key];
            }
        });
        return _item;
    },

    configNames: function(idName,showName,ownerName){
        _idName = idName;
        _showName = showName;
        _ownerName = ownerName;
    }

});

module.exports = ItemStore;