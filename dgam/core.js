"use strict";

var core = (function(){
	var publicAPI = {};
	var c = {
		w:500, 
		h:300,
		canvas:{},		
		ctx:{},
		camera:{
			x:0,
			y:0,
			centerOn: function( coords ){
				var translate = c.canvasToGrid( {x: c.w/2, y: c.h/2} );
				c.camera.x = translate.x;		
				c.camera.y = translate.y;
			},
			zoom: function( zStep ){
				var camgridX= this.x / cellsize; 
				var camgridY= this.y / cellsize; 
				var cangridMidX = c.w/2/cellsize;
				var cangridMidY = c.h/2/cellsize;
				var currentZoom = cellsize;
				cellsize *= zStep;
				this.x += (cangridMidX+camgridX)*(cellsize - currentZoom);
				this.y += (cangridMidX+camgridY)*(cellsize - currentZoom);
			}
			
		},
		canvasToGrid: function( coords ){
			return {
				x:Math.floor((c.camera.x / cellsize) + (coords.x / cellsize)),
				y:Math.floor((c.camera.y / cellsize) + (coords.y / cellsize))
			}			
		}
	};

	var cellsize= 10;
	var keyStates = [];
	var territories = [];
	var map={
		land:[[]],
		width:150,
		height:100,
		registerLands: function(aTerritory){
			aTerritory.lands.forEach(function(l){
				map.land[l.x][l.y].owner = aTerritory
			});
		},
		isLandFree: function( coords ){
			var onMap = utils.containedInBox(coords.x,coords.y,-1,map.width,-1,map.height);
			var nulled = map.land[coords.x] == null || map.land[coords.x][coords.y] == null;
			if( nulled ){return false;}
			var owned = map.findOwner(coords) != null;
			return (onMap && !owned);
		},
		findOwner : function( coords ){
			return map.land[coords.x][coords.y].owner;
		}
	};

	
	function init(){
		territories = [];
		utils.buildMap(map);
		buildTerritories();
		window.addEventListener("keydown", function (e) { keyStates[e.keyCode] = true; } );
		window.addEventListener("keyup", function (e) { 
			keyStates[e.keyCode] = false;
			if( e.keyCode == key.SPACE ) {
				territories.forEach(t => utils.territoryGenerationStep(t, map) );
			}
		} );
		window.addEventListener("mousedown", click);
		c.canvas = document.getElementById("c");
		c.ctx = c.canvas.getContext( '2d' );
		c.canvas.width = c.w;
		c.canvas.height = c.h;	
		render();
	}
	publicAPI.init = init;
	function click(event){
		var coords = c.canvasToGrid({x: event.offsetX, y: event.offsetY});
		console.log(coords);
	}
	function handleKeyInput(){
		if (keyStates[key.UP]) {
			c.camera.y -= 3;
		}
		if (keyStates[key.DOWN]) {
			c.camera.y +=  3;
		}
		if (keyStates[key.LEFT]) {
			c.camera.x -= 3;
		}
		if (keyStates[key.RIGHT]) {
			c.camera.x += 3;
		}
		if (keyStates[key.NP_PLUS]){
			c.camera.zoom(1.02);
		}
		if (keyStates[key.NP_MINUS]){
			c.camera.zoom(0.98);
		}
	}

	function render(){
		handleKeyInput();
		c.ctx.fillStyle = "#000000";
		c.ctx.fillRect( 0, 0, c.w, c.h );
		c.ctx.fillStyle = "#ffffff";
		c.ctx.fillRect( 0-c.camera.x, 0-c.camera.y, map.width * cellsize, map.height * cellsize );
		territories.forEach(t => {t.draw(c.ctx, cellsize);} );
		requestAnimationFrame( render );
	}

	function buildTerritories(){
		var tNum = 70;
		var rX = "1d" + ( map.width-1 );
		var rY = "1d" + ( map.height-1 );
		var x = utils.d.roll(rX);
		var y = utils.d.roll(rY);
		var collisions = 0;
		while(tNum > 0 && collisions < 1000){
			x = utils.d.roll(rX);
			y = utils.d.roll(rY);
			if(
				   map.isLandFree({x: x,	y:y  })
				&& map.isLandFree({x: x-1,	y:y  })
				&& map.isLandFree({x: x+1,	y:y  })
				&& map.isLandFree({x: x,	y:y-1})
				&& map.isLandFree({x: x,	y:y+1})
			){
				territories.push( new Territory( {x:x, y:y}, territories.length) ); 
				tNum--;
				collisions = 0;
			}
			else{
				collisions++;
			}
		}
		console.log(collisions);
	}

	function Territory(coords, ID){
		var myColor = "rgb(" + utils.d.roll("1d255") + "," + utils.d.roll("1d255") + "," + utils.d.roll("1d255") + ")" ;
		var myNeighbors = [];
		var myID = ID;
		function drawSides(ctx, cellSize, land){
			var canvasX = land.x*cellSize - c.camera.x;
			var canvasY = land.y*cellSize - c.camera.y;
			if(land.x > 0 && map.land[land.x-1][land.y].owner != terr){
				ctx.strokeRect(canvasX, canvasY, 1, cellSize);
			}			
			if(land.x < map.width && map.land[land.x+1][land.y].owner != terr){
				ctx.strokeRect(canvasX+cellSize, canvasY, 1, cellSize);
			}			
			if(land.y < map.height && map.land[land.x][land.y+1].owner != terr){
				ctx.strokeRect(canvasX, canvasY+cellSize, cellSize, 1);
			}
			if(land.y > 0 && map.land[land.x][land.y-1].owner != terr){
				ctx.strokeRect(canvasX, canvasY, cellSize, 1);
			}
		};
		var terr = {
			lands:[]
			,draw: function(ctx, cellSize){
				ctx.strokeStyle="#000000";
				ctx.lineWidth=cellsize / 10;
				ctx.fillStyle = myColor;
				terr.lands.forEach( e => {
					var canvasX = e.x*cellSize - c.camera.x;
					var canvasY = e.y*cellSize - c.camera.y;
					ctx.fillRect(canvasX, canvasY, cellSize, cellSize);
					drawSides(ctx, cellSize, e);
				});
			}
			,drawSelected: function(ctx, cellsize){
				terr.lands.forEach( e => {
					var canvasX = e.x*cellSize - c.camera.x;
					var canvasY = e.y*cellSize - c.camera.y;
					ctx.strokeStyle = "#ffffff";
					ctx.lineWidth = cellsize/5;
					ctx.strokeRect(canvasX, canvasY, cellSize, cellSize);
				});
			}
			,getID: function(){
				return myID;
			}
		}
			
		terr.lands.push( coords );
		map.registerLands( terr )
		return terr;
	}
	
	publicAPI.map = map;
	return publicAPI;
}());



(function() {
	var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();