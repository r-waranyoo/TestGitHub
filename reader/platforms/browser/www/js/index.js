$(document).ready(function() {
    app.fetchFeed('http://rss.nytimes.com/services/xml/rss/nyt/World.xml');
});
var app = {
api_url: "https://aqueous-eyrie-16697.herokuapp.com/api/feeds?rss_url=",
onAddButtonClicked: function(id) {
       var rss_url = document.getElementById(id).value;
        if (rss_url == "" || !app.validateURL(rss_url)) {
          navigator.notification.alert('Please insert a valid url!', null,'Error','OK');
        }else {
          app.fetchFeed(rss_url);
        }
    },
// helper
validateURL: function(url) {
      var urlregex =/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
      return urlregex.test(url);
    },
// API call
fetchFeed: function(feed_url) {
       $.ajax({
          type: "GET",
          dataType: 'jsonp',
          url: app.api_url + feed_url,
          success: app.onSuccess,
          error: app.onError
       });
    },
// Update DOM on a Success Event
onSuccess: function(data) {
       if (data.hasOwnProperty('status')) {
          navigator.notification.alert('Please insert a valid feed!', null,'Error','OK');
       }else{
        var items = [];
        $.each(data, function(key, val){
              var url = val['enclosure'].link
              items.push('<div class="card mb-3"> <img class="card-img-top img-responsive" src="'+url+'"> <div class="card-block"> <h4 class="card-title">'+ val.title +'</h4> <p class="card-text">'+ val.description +'</p> <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> </div> </div>')
        });
        $('#feeds').html(items.join(''));
      }
    },
onError: function(data, textStatus, errorThrown) {
        console.error('Data: ' + data);
        console.error('Status: ' + textStatus);
        console.error('Error: ' + errorThrown);
    },
};