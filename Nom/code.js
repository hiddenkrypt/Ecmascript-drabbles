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
		setTimeout( function(){ drabble.loader.clearItem( myID1 ); }, 1000 );
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
	var e = {
		init: function(){},
		postInit: function(){},
		test: function(){},
		start: function(){}
	};
	
	function makePlayer(){
		return {
			size: 1
			,x: c.settings.canvas.WIDTH/2
			,y: c.settings.canvas.HEIGHT/2
		}
	}
	function addBit(){
		bits.push{
			size:1
			,x: Math.random()*settings.MAP_WIDTH
			,y: Math.Random()*settings.MAP_HEIGHT
			,dx: Math.Random()*4 - 2
			,dy: Math.Random()*4 - 2
		}
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
			if(BitA.size == bitB.size ) {	
			} else if(bitA.size > bitB.size){
				bitA.size += Math.ceiling( bitB.size/2 );
				bitB.size = 0;
			} else if(bitA.size < bitB.size){
				bitB.size += Math.ceiling( bitA.size/2 );
				bitA.size = 0;
			}
		}
	}
	
return e;})();