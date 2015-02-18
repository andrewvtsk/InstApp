define([
  'underscore',
  'backbone',
  'models/detailModel',
  'collections/imageCollection',
  'collections/commentCollection',
  'views/detailView',
  'views/imagesView',
  'text!templates/search.html',
  'text!templates/comment.html',
  'router',
], function(_, Backbone, DetailModel, Images, LocalComments, DetailView, ImagesView, SearchTmp, CommentTmp, Router){
    var AppView = Backbone.View.extend({
      el: $('#main'),

      searchTmp: _.template(SearchTmp),
      commentTmp: _.template(CommentTmp),

      events: {
        'click #find': 'find',
        'click #next': 'more',
        'click .image': 'redirect',
        'keypress #tag': 'keypress',
        'keypress .isend': 'send'
      },

      initialize: function(tag){
        this.render();
        items = new Images;
        itemView = new ImagesView({
          model: items
        });

        this.input = this.$('#tag');

        tag = (typeof(tag) == 'string') ? tag : '';
        if (tag) {
          this.input.val( tag );
          this.search();
        }
        return this;
      },

      render: function(){
        $(this.el).empty().append(this.searchTmp);
        return this;
      },

      more: function(){
        items.fetch({dataType: 'jsonp'});
      },

      find: function(){
        var str = this.input.val().split(" ")[0]
        router.navigate('photos/' + str, true);
      },

      search: function(){
        if (!this.input.val()) return;
        items.fetch({dataType: 'jsonp'});
      },

      redirect: function(e){
        var id = $(e.target).parent().parent().attr('id');
        if (!id) return;
        router.navigate('photo/' + id, true);
      },

      keypress: function(e){
        if (e.keyCode == 13) {
          this.find();
        };
      },

      send: function(e){
        if (!(e.keyCode == 13)) return;
        var input = $(e.target);
        if (!input.val()) return;
        var parentNode = input.parent().parent();
        var oid = parentNode.attr('id');
        LocalComments.addComment({
          'oid': oid,
          'text': input.val()
        });
        input.val('');

        localcomments = LocalComments.getBy({'oid': oid});

        var cont = 'div#' + oid + ' .localComments';
        $(cont).empty();
        ctmp = '<div class="col-md-12" style="margin-left: -15px;">Last of ' + localcomments.length + ' Local  comments:</div>';
        $(cont).append(ctmp);

        _.each(localcomments.slice(-3), function(item){
          $(cont).append(this.commentTmp(item));
        }, this);
      }

    });

    var router = new Backbone.Router();
    return AppView;
  });
