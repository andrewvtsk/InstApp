define([
  'backbone',
  'models/imageModel',
  ], function(Backbone, ImageModel){

    var ImageList = Backbone.Collection.extend({
      model: ImageModel,
      count: 5,
      token: "309361171.1fb234f.ab49078afaad4a24b571c5f4237df35c",

      url: function(){
        return "https://api.instagram.com/v1/tags/" + $("#tag").val() + "/media/recent?access_token=" + this.token + "&count=" + this.count + "&type=image";
      },

      parse: function(response){
        this.url = response.pagination.next_url;
        return response.data;
      },
    });

    return ImageList;
  });
