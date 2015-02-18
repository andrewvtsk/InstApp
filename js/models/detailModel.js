define([
  'underscore',
  'backbone',
  'collections/commentCollection',
  //'crossdomain'
], function(_, Backbone, LocalComments){

    var DetailModel = Backbone.Model.extend({
      id: "",

      token: "309361171.1fb234f.ab49078afaad4a24b571c5f4237df35c",

      url: function(){
        return "https://api.instagram.com/v1/media/" + this.id + "?access_token=" + this.token;
      },

      initialize: function(id) {
        this.id = id;
      },

      parse: function(response){
        var obj = response.data;
        obj['localComments'] = LocalComments.getBy({'oid': this.id});
        var fields = ['comments', 'caption', 'id', 'images', 'likes', 'user', 'localComments'];
        _.each(fields, function(key){
          this[key] = obj[key];
        }, this);
      }
    });

    return DetailModel;
  });
