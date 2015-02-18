define([
  'underscore',
  'backbone',
  'collections/imageCollection',
  'text!templates/images.html',
  'text!templates/comment.html'
], function(_, Backbone, Images, ImageTmp, CommentTmp){

    var ImagesView = Backbone.View.extend({
      el: "#items",

      imageTmp: _.template(ImageTmp),
      commentTmp: _.template(CommentTmp),

      initialize: function(){
        this.model.on('sync', this.render, this);
      },

      render: function(){
        _.each(this.model.models, function(item){
          item['commentTmp'] = this.commentTmp;
          $(this.el).append(this.imageTmp(item));
        }, this);
        $('#more').show();
        return this;
      }
    });

    return ImagesView;
  });
