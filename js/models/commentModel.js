define([
  'underscore',
  'backbone',
  //'crossdomain'
  ], function(_, Backbone){
    var CommentModel = Backbone.Model.extend({
      parse: function(item){
        return item;
      },
    });
    return CommentModel;
  });
