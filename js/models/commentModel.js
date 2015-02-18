define([
  'underscore',
  'backbone',
  //'crossdomain'
  ], function(_, Backbone){
    var CommentModel = Backbone.Model.extend({
      /*initialize: function(){
      },*/

      parse: function(item){
        return item;
      },
    });
    return CommentModel;
  });
