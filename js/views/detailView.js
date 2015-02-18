define([
  'underscore',
  'backbone',
  'models/detailModel',
  'collections/commentCollection',
  'text!templates/detail.html',
  'text!templates/comment.html'
], function(_, Backbone, Detail, LocalComments, DetailTmp, CommentTmp){
    var DetailView = Backbone.View.extend({
      el: $("#main"),

      detailTmp: _.template(DetailTmp),
      commentTmp: _.template(CommentTmp),

      events: {
        'keypress .dsend': 'send',
      },

      initialize: function(id){
        this.model = new Detail(id);
        this.model['commentTmp'] = this.commentTmp;
        this.model.on('sync', this.render, this);
        this.model.fetch({dataType: 'jsonp'});
      },

      render: function(){
        $(this.el).empty().append(this.detailTmp(this.model));
        $("#localComments").animate({
            "scrollTop": $("#localComments")[0].scrollHeight
          }, 500);
        return this;
      },

      send: function(e){
        if (!(e.keyCode == 13)) return;
        var input = $(e.target);
        if (!input.val()) return;
        var oid = $("#oid").val();
        //var oid = input.parent().attr('id');
        var comment = LocalComments.addComment({
          'oid': oid,
          'text': input.val()
        });
        input.val('');

        localcomments = LocalComments.getBy({'oid': oid});
        var cont = '#localComments';
        $(cont).empty();

        _.each(localcomments, function(item){
          $(cont).append(this.commentTmp(item));
        }, this);

        $("#localComments").animate({
            "scrollTop": $("#localComments")[0].scrollHeight
          }, 300);

      }

    });

    return DetailView;
  });
