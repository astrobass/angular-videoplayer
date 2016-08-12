angular.module('videoplayer', [])
  .directive('videoplayer', function() {
    return {
      name: 'videoplayer',
      scope: {},
      controller: 'videoCtrl',
      restrict: 'E',
      template: '<div><video id="video-player" autoplay></video><canvas id="canvas-video-player"></canvas></div>',
      replace: true
    };
  })
  .controller('videoCtrl', function() {
    var successCallback =  function(localMediaStream) {
      var video = document.getElementById('video-player');
      video.src = window.URL.createObjectURL(localMediaStream);
      video.style.cssText += '; position: absolute; top: 50%; left: 50%; margin: -180px 0 0 -240px; display: none;';
      var canvas = document.getElementById('canvas-video-player');
      canvas.style.cssText += '; position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%;';
    };
  
    var errorCallback = function(e) {
      console.log('Rejected!', e);
    };
  
    navigator.getUserMedia  = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;

    var constraints = { video: true };
    navigator.getUserMedia(constraints, successCallback, errorCallback);
    var v = document.getElementById('video-player');
    var canvas = document.getElementById('canvas-video-player');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');
    var cw,ch;
    cw = v.clientWidth;
    ch = v.clientHeight;
    canvas.width = cw;
    canvas.height = ch;
    back.width = cw;
    back.height = ch;
    draw(v, context, backcontext, cw, ch);

    function draw(v, c, bc, w, h) {
      bc.drawImage(v, 0, 0, w, h);
      var idata = bc.getImageData(0, 0, w, h);
      var data = idata.data;
      for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var brightness = (3*r+4*g+b)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
      }
      idata.data.set(data);
      c.putImageData(idata,0,0);
      setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
    }
  });
