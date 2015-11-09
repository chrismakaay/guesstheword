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

        /**
         * Default init method which is called when the view is first created
         *
         * @method  initialize
         * @returns {exports.initialize}
         */
        initialize : function() {
            this.$scoresList = $('#scores').find('ul');

            this.updateWordCollection();
            this.updateScoreList();
            this.showSection('#play');

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
         *
         */
        updateScoreList : function() {
            var self = this;

            this.$scoresList.html('');

            this.Words.each(function(item){
                if (item.get('isMatched')) {
                    self.$scoresList.append(
                        '<li>' + item.get('word') + '<span>' + item.get('points') + '</span></li>'
                    );
                }
            });
        },

        /**
         * Returns a model from the collection which
         * has the given word in his word attribute
         *
         * @method  getModelByWord
         * @param   {string} word
         * @returns {Backbone.Model}
         */
        getModelByWord : function(word) {
            return this.Words.find(function(item) {
                return item.get('word') === word;
            });
        },

        /**
         * Handler of the navigation buttons click event
         *
         * @method  onNavButtonClick
         * @param   {object} ev    The event object
         * @returns {void}
         */
        onNavButtonClick : function(ev) {
            ev.preventDefault();
            this.showSection(ev.target.hash);
        },

        /**
         * Shows a selected section block and hides the others
         *
         * @method showSection
         * @param   {string} sectionSel    The CSS selector of the section block
         * @returns {void}
         */
        showSection : function(sectionSel) {
            this.$el.find('section').hide();
            $(sectionSel).show();
        },

        /**
         * Handler of the check button click event
         *
         * @method  onCheckButtonClick
         * @param   {object} ev    The event object
         * @returns {void}
         */
        onCheckButtonClick : function(ev) {
            ev.preventDefault();

            var typedWord = this.$el.find('input').val(),
                wordModel = this.getModelByWord(typedWord);

            if (wordModel && !wordModel.get('isMatched')) {
                wordModel.set('isMatched', true);
                wordModel.save();
                this.showSuccessMessage(wordModel.get('points'));
                this.updateScoreList();
            }
            else {
                this.showErrorMessage();
            }
        },

        /**
         * Shows the success message and hides any other alert message
         *
         * @method  showSuccessMessage
         * @param   {number} points    The score points
         * @returns {void}
         */
        showSuccessMessage : function(points) {
            var messageContainer = this.$el.find('.alert-success'),
                pointsContainer  = messageContainer.find('p span');

            this.$el.find('.alert').hide();
            pointsContainer.html(points);
            messageContainer.show();
        },

        /**
         * Shows the error message and hides any other alert message
         *
         * @method  showErrorMessage
         * @returns {void}
         */
        showErrorMessage : function() {
            this.$el.find('.alert').hide();
            this.$el.find('.alert-danger').show();
        }
    });
});
