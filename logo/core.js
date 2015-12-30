var core = (function(){
	var color =  {
			bg: "#ffffff",
			fg: "#000000"
		},
		c = {}, 
		ctx = {},
		cellsize = 1,
		speed = {
			fade: 1000,
			punch: 75
		};
	var flags = {
		fadeIn: false,
		fadeOut: false
	}
	var coords = [
		//r
		{x:0, y:0, active:false},
		{x:0, y:1, active:false},
		{x:0, y:2, active:false},
		{x:1, y:0, active:false},
		{x:1, y:1, active:false},
		{x:2, y:1, active:false},
		{x:2, y:2, active:false},
		//a
		{x:3, y:1, active:false},
		{x:3, y:2, active:false},
		{x:4, y:0, active:false},
		{x:4, y:2, active:false},
		{x:5, y:1, active:false},
		{x:5, y:2, active:false},
		//v
		{x:6, y:0, active:false},
		{x:6, y:1, active:false},
		{x:7, y:2, active:false},
		{x:8, y:0, active:false},
		{x:8, y:1, active:false},
		//t
		{x:9, y:0, active:false},
		{x:10, y:0, active:false},
		{x:10, y:1, active:false},
		{x:10, y:2, active:false},
		{x:11, y:0, active:false}
	];

	function init(){
		c = document.getElementById("c");
		cellsize = c.width/12;
		c.height = cellsize*3;
		ctx = c.getContext("2d");
		coords = scramble(coords);
		drawFrame();
	}

	function runAnimation(){
		coords.forEach(pixel => pixel.active = false);
		var i = 0;
		function f(){
			if(++i < coords.length){
				coords[i].active = true;
				setTimeout(f, speed.punch);
			}			
		}
		setTimeout(f, speed.punch);
	}
	
	function drawFrame(){
		ctx.fillStyle = color.bg;
		ctx.fillRect(0,0,c.width, c.height);
		ctx.fillStyle = color.fg;
		coords.forEach(function(pixel){
			if(pixel.active){
				ctx.fillRect(pixel.x*cellsize, pixel.y*cellsize, cellsize, cellsize);
			}
		});
		requestAnimationFrame(drawFrame);
	}

	function scramble(array){
		var temp = [];
		while( array.length > 0){
			var index = Math.floor(Math.random()*array.length);
			temp = temp.concat( array.splice(index , 1) );
		}
		return temp;
	}
	return {
		color: color,
		speed: speed,
		runAnimation: runAnimation,
		init: init,
		flags : flags,
		coords: coords
	};
}());


(function() {
    var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
