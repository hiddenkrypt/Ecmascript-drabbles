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
	var e = {
		init: function(){},
		postInit: function(){},
		test: function(){},
		start: function(){}
	};
	return e;
	
	
	
	
})();