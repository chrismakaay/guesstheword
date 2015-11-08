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

        /**
         * Adds the words to the model collection, if it not contains them
         *
         * @method  updateWordCollection
         * @returns {void}
         */
        updateWordCollection : function() {
            this.Words = new WordCollection();
            this.Words.fetch();

            for (var i=0; i < wordArray.length; i++) {
                if (!this.getModelByWord(wordArray[i])) {
                    var model = new WordModel({
                        word: wordArray[i]
                    });
                    this.Words.add(model);
                    model.save();
                }
            }
        },

        /**
         * Returns a model from the collection which
         * has the given word in his word attribute
         *
         * @method  getModelByWord
         * @param   {string} word
         * @returns {boolean}
         */
        getModelByWord : function(word) {
            var model = this.Words.find(function(item) {
                return item.get('word') === word;
            });
            return model;
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

            var typedWord = this.$el.find('input').val(),
                wordModel = this.getModelByWord(typedWord);

            if (wordModel) {
                this.showSuccessMessage(wordModel.get('points'));
            }
            else {
                this.showErrorMessage();
            }
        },

        showSuccessMessage : function() {
            this.$el.find('.alert-success').show();
        },

        showErrorMessage : function() {
            this.$el.find('.alert-success').show();
        },

        setActiveButton : function() {
            $('nav a').removeClass('disabled');
            $('nav a:first').addClass('disabled');
        },


    });
});
