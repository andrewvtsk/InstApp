define([
  'underscore',
  'backbone',
  'models/commentModel',
  'localstorage'
], function(_, Backbone, CommentModel, Storage){

    var CommentList = Backbone.Collection.extend({
      model: CommentModel,

      localStorage: new Storage ('instApp_comments-backbone'),

      addComment: function(item){
        var comment = new this.model;
        item['from'] = {'username': 'Anonimus',
                        'profile_picture':' https://instagramimages-a.akamaihd.net/profiles/anonymousUser.jpg'};
        for(key in item){
          comment[key] = item[key];
          comment.set(key, _.clone(comment[key]));
        };
        this.create(comment);
        this.fetch();
      },

      getBy: function(m){
        this.fetch();
        l = _.where(this.toJSON(), m);
        return l;
      }
    });

    return new CommentList();
  });
