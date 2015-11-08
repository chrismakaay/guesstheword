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
        el : 'body',
        events : {
            'click nav a'  : 'onNavButtonClick',
            'click button' : 'onCheckButtonClick'
        },

        initialize : function() {
            this.updateWordCollection();
            this.showSection('#play');
            this.setActiveButton();

            return this;
        },



        updateWordCollection : function() {
            this.Words = new WordCollection();
            this.Words.fetch();

            for (var i=0; i < wordArray.length; i++) {
                if (!this.isWordSaved(wordArray[i])) {
                    var model = new WordModel({
                        word: wordArray[i]
                    });
                    this.Words.add(model);
                    model.save();
                }
            }
            console.log(this.Words);
        },

        /**
         * Returns TRUE, if there is a model in the collection which
         * has the given word in his word attribute
         *
         * @method isWordSaved
         * @param   {string} word
         * @returns {boolean}
         */
        isWordSaved : function(word) {
            var isSaved = this.Words.find(function(item) {
                return item.get('word') === word;
            });
            return isSaved;
        },

        onNavButtonClick : function(ev) {
            ev.preventDefault();
            this.showSection(ev.target.hash);
        },

        showSection : function(sectionSel) {
            this.$el.find('section').hide();
            $(sectionSel).show();
        },

        onCheckButtonClick : function(ev) {
            ev.preventDefault();

            var typedWord = this.$el.find('input').val();

            if (this.isWordSaved(typedWord)) {
                console.log('ahaaa');
            }
        },

        setActiveButton : function() {
            $('nav a').removeClass('disabled');
            $('nav a:first').addClass('disabled');
        },


    });
});
