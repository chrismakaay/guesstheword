define([
    'jquery',
    'underscore',
    'backbone',
    'script/game-words',
    'script/models/WordModel',
    'script/collections/WordCollection',
    'backbone.localStorage'
], function($, _, Backbone, wordArray, WordModel, WordCollection) {
    return Backbone.View.extend({
        initialize: function(options) {
            this.updateWordCollection();

            $('#play').show();

            this.setActiveButton();

            return this;
        },

        updateWordCollection : function() {
            this.Words = new WordCollection();
            this.Words.fetch();

            this.Words.map(function(a,b,c){
                console.log(a,b,c);
            });
            console.log(this.Words);

            for (var i=0; i < wordArray.length; i++) {
                var model = new WordModel({
                    id   : i+1,
                    word : wordArray[i]
                });
                console.log('model: ', model.id);
                console.log('model: ', this.Words.indexOf(model));
                this.Words.add(model);
                model.save();
            }

            console.log(this.Words);
        },

        setActiveButton : function() {
            $('nav a').removeClass('disabled');
            $('nav a:first').addClass('disabled');
        }
    });
});
