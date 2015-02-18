require.config({
  paths: {
    jquery: 'https://code.jquery.com/jquery-2.1.3.min',
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
    backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
    localstorage: 'https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min',
    templates: '../templates'
  }

});

require([
  'app',
  ], function(App){
    App.initialize();
  });
