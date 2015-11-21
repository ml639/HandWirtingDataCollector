var canvas, ctx, bMouseIsDown = false, iLastX, iLastY,
      $save, $imgs, $clean,
      $convert, $imgW, $imgH, $name,
      $sel;
  function init () {
      canvas = document.getElementById('cvs');
      ctx = canvas.getContext('2d');
      $save = document.getElementById('save');
      $clean = document.getElementById('clean');
      $convert = document.getElementById('convert');
      $sel = document.getElementById('sel');
      $imgs = document.getElementById('imgs');
      $imgW = document.getElementById('imgW');
      $imgH = document.getElementById('imgH');
      $name = document.getElementById('name');
      bind();
      draw();
  }
  function bind () {
      canvas.onmousedown = function(e) {

          bMouseIsDown = true;
          iLastX = e.clientX - canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
          iLastY = e.clientY - canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
      }
      canvas.onmouseup = function() {
          bMouseIsDown = false;
          iLastX = -1;
          iLastY = -1;
      }
      canvas.onmousemove = function(e) {
          if (bMouseIsDown) {
              var iX = e.clientX - canvas.offsetLeft + (window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft);
              var iY = e.clientY - canvas.offsetTop + (window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop);
              ctx.moveTo(iLastX, iLastY);
              ctx.lineTo(iX, iY);
              ctx.stroke();
              iLastX = iX;
              iLastY = iY;
              console.log(iX +" "+ iY);
          }
      };
      
      $save.onclick = function (e) {
          download2png();
          // var type = $sel.value,
          //     w = $imgW.value,
          //     h = $imgH.value;
          // Canvas2Image.saveAsImage(canvas, w, h, type);
      }
      $convert.onclick = function (e) {
          var type = $sel.value,
              w = $imgW.value,
              h = $imgH.value;
          $imgs.appendChild(Canvas2Image.convertToImage(canvas, w, h, type))
      }
      $clean.onclick = function(e){
          cleanUp();
      }
      
  }
  function draw () {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 150, 150);
      ctx.lineWidth = 4;
      ctx.beginPath();
  }
  function cleanUp(){
      canvas = null;
      canvas = document.getElementById('cvs');
      ctx = null;
      ctx = canvas.getContext('2d');
      ctx.beginPath();

      bind();
      draw();
  }
  function download2png(){
      var text = $name.value
      var dt = canvas.toDataURL('image/png');
      var st = 'data:application/octet-stream;base64,headers=Content-Disposition%3A%20attachment%3B%20filename='+text+'.png'
      dt = dt.replace(/^data:application\/octet-stream/, st);
      document.getElementById("dl").href = dt;
      document.getElementById("dl").download = text+".png";
      //document.getElementById("dl").addEventListener('click', download2png, false);
  }
  onload = init;