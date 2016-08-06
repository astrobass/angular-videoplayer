angular.module('videoplayer', [])
  .directive('videoplayer', function() {
    return {
      name: 'videoplayer',
      scope: {},
      controller: 'videoCtrl',
      restrict: 'E',
      template: '<video autoplay="true" width="300" height="300"></video>',
      replace: true
    };
  })
  .controller('videoCtrl', function() {
    var errorCallback = function(e) {
      console.log('Reeeejected!', e);
    };

    navigator.getUserMedia  = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;

    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(localMediaStream);

      // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
      // See crbug.com/110938.
      video.onloadedmetadata = function(e) {
        // Ready to go. Do some stuff.
      };
    }, errorCallback);
  });
