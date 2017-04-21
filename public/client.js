document.addEventListener("DOMContentLoaded", function() {
   var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };

   // get canvas element and create the context
   var canvas  = document.getElementById('drawing');
   var ctx = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();

   // set canvas to be the full browser width/height
   canvas.width = width;
   canvas.height = height;

   canvas.onmousedown = function(e){
      mouse.click = true;
   };
   canvas.onmouseup = function(e){
      mouse.click = false;
   };

   canvas.onmousemove = function(e) {
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
   };

   canvas.ontouchmove = function(e) {
      for (var i = 0; i < event.touches.length; i++) {
          var touch = event.touches[i];
          var colors = ["red", "pink", "lightblue", "purple", "lightgreen", "black", "amber", "cadet"];
          var sizes = [1, 0.5, 3, 5];
          ctx.beginPath();
          ctx.arc(touch.pageX, touch.pageY, 2, 0, 2*Math.PI, true);
          ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.fill();
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.stroke();
        }
        mouse.move = true;
   }

   // draw line received from server
	socket.on('line_draw', function (data) {
      var line = data.line;
      document.getElementsByClassName('button')[0].style.display = 'block';

      // drawArc();
      var colors = ["red", "pink", "lightblue", "purple", "lightgreen", "black"];
      var sizes = [1, 0.5, 3, 5];
      ctx.beginPath();
      ctx.lineWidth = sizes[Math.floor(Math.random() * sizes.length)];
      ctx.moveTo(line[0].x * width, line[0].y * height);
      ctx.lineTo(line[1].x * width, line[1].y * height);
      ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
      console.log(ctx.strokeStyle);
      ctx.fill();
      ctx.stroke();
      //
   });
   
   // main loop, running every 25ms
   function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
         // send line to to the server
         socket.emit('line_draw', { line: [ mouse.pos, mouse.pos_prev ] });
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
   }
   mainLoop();

   // button for saving the image to the users desktop
   var save_image = document.getElementById('save_image');
   save_image.addEventListener('click', function(e) {
      // alert('you have clicked the button');
      var dataURL = canvas.toDataURL('image/jpg');
      save_image.href = dataURL;
   });

   var reset = document.getElementById('reset');
   reset.addEventListener('click', function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
   });
});