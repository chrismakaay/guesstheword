require.config({
    paths: {
        'jquery': 'script/libs/jquery.1.11.3.min',
        'underscore': 'script/libs/underscore.min',
        'backbone': 'script/libs/backbone.min',
        'backbone.localStorage': 'script/libs/backbone.localstorage.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone.localStorage'
        }
    }
});

require([
    'script/game-router'
], function(WordGameRouter) {
    window.app = new WordGameRouter();
});
