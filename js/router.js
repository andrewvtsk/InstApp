define([
  'jquery',
  'underscore',
  'backbone',
  'views/detailView',
  'views/appView',
], function($, _, Backbone, DetailView, AppView){
    var AppRouter = Backbone.Router.extend({
      routes: {
        '': 'search',
        'photos': 'search',
        'photos/:tag': 'search',
        'photo/:id': 'detail',
        '*actions': 'search'
      },
    });

    var initialize = function (){
      var app_router = new AppRouter;

      app_router.on('route:search', function(tag){
        var appView = new AppView(tag);
      });

      app_router.on('route:detail', function(id){
        var detailView = new DetailView(id);
      });

      Backbone.history.start();
      $.ajaxSetup({
        url: "https://api.instagram.com"
      });
    };

    return {
      initialize: initialize
    };
  });
