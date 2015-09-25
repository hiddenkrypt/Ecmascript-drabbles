"use strict";

var drabble = drabble || (function newDrabble(){
	var d = {
		debugMode: true
		,loader: {}
		,debug1: function(){}
		,debug2: function(){}
		,debug3: function(){}
		,debug4: function(){}
		,c: {}
		,ctx: {}
		,init: function(){
			d.loader.state = 'pending/ready';
			d.debug1 = function( message ){ document.getElementById( 'debug1' ).innerHTML = d.debugMode?message:''; };
			d.debug2 = function( message ){ document.getElementById( 'debug2' ).innerHTML = d.debugMode?message:''; };
			d.debug3 = function( message ){ document.getElementById( 'debug3' ).innerHTML = d.debugMode?message:''; };
			d.debug4 = function( message ){ document.getElementById( 'debug4' ).innerHTML = d.debugMode?message:''; };
			d.c = document.getElementById( 'drabbleCanvas' );
			d.ctx = document.getElementById( 'drabbleCanvas' ).getContext("2d");
			code.init();
		}
		,key: {
			BKSP:		8,
			CTRL:		17,
			CAPLK:		20,
			ESC:		27,
			PG_UP: 		33,
			PG_DN: 		34,
			LEFT: 		37,
			UP: 		38,
			RIGHT: 		39,
			DOWN: 		40,
			INS:		45,
			DEL:		46,
			WINK:		91,
			NP_MIN:		109,
			NUMLK:		144,
			SCRLK:		145,
			LT:			188,
			GT:			190,
			BTICK:		192,
			LBRACE:		219,
			LCURLY:		219,
			RBRACE:		221,
			RCURLY:		221,
			DBQTE:		222,
			
			BACKSPACE:		8,
			TAB:			9,
			ENTER: 			13,
			SHIFT:			16,
			CONTROL:		17,
			ALT:			18,
			PAUSE:			19,
			BREAK:			19,
			CAPSLOCK:		20,
			ESCAPE:			27,
			SPACE:			32,
			PAGE_UP: 		33,
			PAGE_DOWN: 		34,
			END:			35,
			HOME: 			36,
			LEFT_ARROW: 	37,
			UP_ARROW: 		38,
			RIGHT_ARROW:	39,
			DOWN_ARROW: 	40,
			PRINTSCREEN:	44,
			INSERT:			45,
			DELETE:			46,
			ZERO: 			48,
			ONE:			49,
			TWO:			50,
			THREE:			51,
			FOUR:			52,
			FIVE:			53,
			SIX:			54,
			SEVEN:			55,
			EIGHT:			56,
			NINE:			57,
			WINDOWS_KEY:	91,
			WINDOWS_MENU:	93,
			NP_0:			96,
			NP_1:			97,
			NP_2:			98,
			NP_3:			99,
			NP_4:			100,
			NP_5:			101,
			NP_6:			102,
			NP_7:			103,
			NP_8:			104,
			NP_9:			105,
			NP_STAR:		106,
			NP_PLUS:		107,
			NP_MINUS:		109,
			NP_DOT:			110,
			NP_SLASH:		111,
			F1:				112,
			F2:				113,
			F3:				114,
			F4:				115,
			F5:				116,
			F6:				117,
			F7:				118,
			F8:				119,
			F9:				120,
			F10:			121,
			F11:			122,
			F12:			123,
			NUMBER_LOCK:	144,
			SCROLL_LOCK:	145,
			LESSTHAN:		188,
			COMMA:			188,
			GREATERTHAN:	190,
			FULLSTOP:		190,
			SLASH:			191,
			QUESTIONMARK:	191,
			TILDE:			192,
			BACKTICK:		192,
			LEFT_BRACE:		219,
			LEFT_CURLY:		219,
			BACKSLASH:		220,
			PIPE:			220,
			RIGHT_BRACE:	221,
			RIGHT_CURLY:	221,
			QUOTE:			222,
			DOUBLEQUOTE:	222,
			
			'\t':	8,
			' ':	32,
			'<':	188,
			',':	188,
			'>':	190,
			'.':	190,
			'/':	191,
			'?':	191,
			'~':	192,
			'`':	192,
			'[':	219,
			'{':	219,
			"\\":	220,
			']':	221,
			'}':	221,
			"'":	222,
			'"':	222,
			
			MUTE:		173,
			VOL_DW:		174,
			VOL_UP:		175,
			SEMICOLON:	186,
			COLON:		186,
			EQ:			187,
			PLUS:		187,
			HYPHEN:		189,
			UNDERS:		189,

			FF_MUTE:		181,
			FF_VOL_DOWN:	182,
			FF_VOL_UP:		183,
			FF_SEMICOLON:	59,
			FF_COLON:		59,
			FF_EQUALS:		61,
			FF_PLUS:		61,
			FF_HYPHEN:		173,
			FF_UNDERS:		173
		}
	};
	
	d.loader = (function(){
		var itemCount = 0;
		var rotation = 0;
		var load = {
			begin: function(){}
			,end: function(){}
			,registerItem: function(){}
			,clearItem: function(){}
			,state: 'uninitialized'
			,items:[]
			,itemCount: 0
		}
		load.begin = function(){
			d.debug1( d.debugMode?'<i>LOADING</i>':'' );
			load.state = 'loading';
			loadingAnimation();
		}
		load.end = function(){
			load.state = 'complete';
			d.c.width = code.canvas.WIDTH;
			d.c.height = code.canvas.HEIGHT;
			d.ctx.clearRect(0, 0, d.c.width, d.c.height);
			d.debug1( '' );
			d.debug2( '' );
			d.debug3( '' );
			d.debug4( '' );
			code.start();
		}
		load.error = function( aMessage ){
			load.state = 'error';
			d.debug1( "Error while loading or initializing: " + aMessage );
		}
		load.registerItem = function( ){
			var itemID = itemCount++;
			load.items.push( itemID );
			console.log("registered:" + load.items);
			return itemID;
		}
		load.clearItem = function( itemIndex ){
			load.items.splice( load.items.indexOf(itemIndex), 1 );
			console.log(load.items);
			
			if( load.items.length === 0 ){
				console.log('items complete, total:'+itemCount);
				load.end();
			}
		}
		function loadingAnimation(){
			var ctx = d.ctx;
			ctx.clearRect(0, 0, d.c.width, d.c.height);
			if(d.loader.state === 'loading'){ 
				if(d.c.width < code.canvas.WIDTH) d.c.width+=2;
				if(d.c.height < code.canvas.HEIGHT) d.c.height+=2;
				
				ctx.save();
					ctx.font="10px Courier";
					ctx.fillStyle = "rgba(0,0,0,"+Math.abs(Math.sin(rotation* Math.PI/180))+")";
					ctx.fillText("Loading...", d.c.width/2-25, 20 );
				ctx.restore();
				ctx.save();
					ctx.translate(d.c.width/2, d.c.height/2);
					ctx.rotate( rotation*Math.PI/180 );
					ctx.fillStyle = "#000000";
					ctx.fillRect( -20, -20, 3, 3 );
					ctx.fillRect( -20,  20, 3, 3 );
					ctx.fillRect(  20, -20, 3, 3 );
					ctx.fillRect(  20,  20, 3, 3 );
					ctx.fillRect( -10,   0, 3, 3 );
					ctx.fillRect(   0,  10, 3, 3 );
					ctx.fillRect(  10,   0, 3, 3 );
					ctx.fillRect(   0, -10, 3, 3 );
					ctx.fillRect(   0,   0, 3, 3 );
				ctx.restore();
				rotation+=2;
				if(rotation >= 360) rotation = 0;
				requestAnimationFrame( loadingAnimation );
			}
		}
		return load;
	})();
	return d;
}());



(function() {
    var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();