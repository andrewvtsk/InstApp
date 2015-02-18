define([
  'underscore',
  'backbone',
  'collections/commentCollection',
  //'crossdomain'
], function(_, Backbone, LocalComments){

    var ImageModel = Backbone.Model.extend({

      parse: function(obj){

        LocalComments.fetch();
        obj['localComments'] = LocalComments.getBy({'oid': obj['id']});

        var fields = ['comments', 'caption', 'id', 'images', 'likes', 'user', 'localComments'];

        _.each(fields, function(key){
          this[key] = obj[key];
          this.set(key, _.clone(this[key]));
        }, this);
      }
    });

    return ImageModel;
  });
