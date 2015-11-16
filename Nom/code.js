"use strict";
var code = ( function newDrabbleCode(){
	var c = {
		settings:  {},
		init:	function(){},
		start: 	function(){},
	};
	
	c.settings = {
		debugLevel: drabble.settings.debugLevels.MAX,
		canvas:{
			MODE: drabble.settings.canvasModes.BOX
			,WIDTH: 600
			,HEIGHT: 400
		}		
	};
	c.init = function(){
		 drabble.loader.begin();
		var myID1 = drabble.loader.registerItem();
		setTimeout( function(){ drabble.loader.clearItem( myID1 ); }, 10 );
		engine.init();
	};
	c.start = function(){
		engine.postInit();
		engine.test();
		engine.start();
	};
	return c;
})();


var engine = engine || (function(){
	var settings = {
		MAP_WIDTH: 4098
		,MAP_HEIGHT: 4098
	};
	var bits = [];
	var keyStates = [];
	var player ={};
	var e = {
		init: function(){

			window.addEventListener( "keydown", function( e ){ keyState[e.keyCode] = false; } );
			window.addEventListener( "keyup",   function( e ){ keyState[e.keyCode] = true; } );
			makePlayer();
			for(var i=0;i<99;i++){
				addBit();
			}
		},
		postInit: function(){},
		test: function(){},
		start: function(){
			render();
		}
	};
	
	function render(){
		var x = drabble.ctx;
		x.fillStyle="#f0f0ff";
		x.fillRect(0,0,code.settings.canvas.WIDTH, code.settings.canvas.HEIGHT );
		x.fillStyle="#696969";
		x.strokeStyle="#000000";
		bits.forEach( function( bitA ){
			if(bitA.size === 0){
				//bits.remove(bitA);
			}
			bitA.x += bitA.dx;
			bitA.y += bitA.dy;
			if( bitA.x < 0 || bitA.x > settings.MAP_WIDTH ){
				bitA.x -= bitA.dx;
				bitA.dx = -bitA.dx;
			}
			if( bitA.y < 0 || bitA.y > settings.MAP_HEIGHT ){
				bitA.y -= bitA.dy;
				bitA.dy = -bitA.dy;
			}
			bits.forEach( function( bitB ){
				if( collision( bitA, bitB ) ){
					eat( bitA, bitB );
				}
			});
			if( collision( player, bitA ) ){
				eat( player, bitA );
			}
			x.fillRect( bitA.x, bitA.y, bitA.size, bitA.size );
			x.strokeRect( bitA.x, bitA.y, bitA.size, bitA.size );
		});
		
		x.fillStyle="#ff5310";
		x.strokeStyle="#ffff00";
	
		x.fillRect(player.x, player.y, player.size, player.size );
		x.strokeRect(player.x, player.y, player.size, player.size );
		requestAnimationFrame( render );
	}
	function makePlayer(){
		player = new Bit();
		player.size= 10
		player.x = code.settings.canvas.WIDTH/2
		player.y = code.settings.canvas.HEIGHT/2
		player.dx = 0
		player.dy = 0
	}
	function addBit(){
		bits.push(new Bit());
	}
	function Bit(){
		return {
			size: (Math.random()*3)+6
			,x: Math.random()*settings.MAP_WIDTH
			,y: Math.random()*settings.MAP_HEIGHT
			,dx: Math.random()*4 - 2
			,dy: Math.random()*4 - 2
			,tick: function(){
				this.x += this.dx;
				this.y += this.dy;
				if( this.x < 0 || this.x > settings.MAP_WIDTH ){
					this.x -= this.dx;
					this.dx = -this.dx;
				}
				if( this.y < 0 || this.y > settings.MAP_HEIGHT ){
					this.y -= this.dy;
					this.dy = -this.dy;
				}
			}
		};
	}
	function collision(bitA, bitB){
		return ( 
			Math.sqrt( 
				( bitA.x - bitB.x ) * ( bitA.x - bitB.x ) 
				+ ( bitA.y - bitB.y ) * ( bitA.y - bitB.y ) 
			) <= bitA.size + bitB.size );
	}
	function eat(bitA, bitB){
		if( collision(bitA, bitB) ){
			if(bitA.size == bitB.size ) {	
			} else if(bitA.size > bitB.size){
				bitA.size += Math.ceil( bitB.size/2 );
				bitA.dx = bitA.dx*.9;
				bitA.dy = bitA.dy*.9;
				bitB.size = 0;
			} else if(bitA.size < bitB.size){
				bitB.size += Math.ceil( bitA.size/2 );
				bitB.dx = bitB.dx*.9;
				bitB.dy = bitB.dy*.9;
				bitA.size = 0;
			}
		}
	}
	
return e;})();