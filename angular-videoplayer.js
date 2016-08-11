angular.module('videoplayer', [])
  .directive('videoplayer', function() {
    return {
      name: 'videoplayer',
      scope: {},
      controller: 'videoCtrl',
      restrict: 'E',
      template: '<video id="videoplayer" autoplay></video><canvas id="canvas-video-player"></canvas>',
      replace: true
    };
  })
  .controller('videoCtrl', function() {
    var successCallback =  function(localMediaStream) {
      var video = document.getElementById('videoplayer');
      video.src = window.URL.createObjectURL(localMediaStream);
      video.style = '{ position: absolute; top: 50%; left: 50%; margin: -180px 0 0 -240px; }';
      var canvas = document.getElementById('canvas-video-player');
      canvas.style = '{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; }';
    };
  
    var errorCallback = function(e) {
      console.log('Reeeejected!', e);
    };
  
    navigator.getUserMedia  = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;

    navigator.getUserMedia({video: true, audio: true}, successCallback, errorCallback);
  });
