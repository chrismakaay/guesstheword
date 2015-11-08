define([
    'backbone',
    'script/models/WordModel.js',
    'backbone.localStorage'
], function(Backbone, Word) {
    return Backbone.Collection.extend({
        model        : Word,
        localStorage : new Backbone.LocalStorage("todos-backbone")
    });
});
