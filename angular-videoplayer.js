angular.module('videoplayer', [])
  .directive('videoplayer', function() {
    return {
      name: 'videoplayer',
      scope: {},
      controller: 'videoCtrl',
      restrict: 'E',
      template: '<video id="video-player" autoplay></video><canvas id="canvas-video-player"></canvas>',
      replace: true
    };
  })
  .controller('videoCtrl', function() {
    var successCallback =  function(localMediaStream) {
      var video = document.getElementById('video-player');
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

    var constraints = { video: true, audio: true };
    navigator.getUserMedia(constraints, successCallback, errorCallback);
  
//    document.addEventListener('DOMContentLoaded', function(){
      var v = document.getElementById('video-player');
      var canvas = document.getElementById('canvas-video-player');
      var context = canvas.getContext('2d');
      var cw = Math.floor(canvas.clientWidth / 100);
      var ch = Math.floor(canvas.clientHeight / 100);
      canvas.width = cw;
      canvas.height = ch;
      v.addEventListener('play', function(){
          draw(this,context,cw,ch);
      },false);
//    },false);

    function draw(v,c,w,h) {
      if(v.paused || v.ended) return false;
      c.drawImage(v,0,0,w,h);
      setTimeout(draw,20,v,c,w,h);
    }
  });
