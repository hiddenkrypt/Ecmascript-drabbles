"use strict";

var Dice = (function(){
	
	function rollElement( ministring ){
		if( ministring>>0 == ministring ){ return ministring>>0; }
		var x = Math.abs(ministring.split("d")[0]>>0) || 1;
		var y = ministring.split("d")[1]>>0;
		var result = 0;
		while(x--){
			result += Math.floor((Math.random()*y) + 1)
		}
		return ( ministring[0] == '-' )? -result : result;
	}
	
	return { 
		roll: function( diceString ){
			if( !diceString.match(/^[0-9]+(d[0-9]+?)?(\+-?[0-9]+(d[0-9]+)?)*$/) ){
				throw "Invalid Dice String";
			}
			var a = diceString.split("+").map( e => rollElement(e) )
			return a.reduce( (b,a) => a+b );
		}
		,test: function( diceString, expected){			
			var tot = 0;
			var accuracy = .1;
			var runs = 100000;
			for( let i=0; i < runs; i++ ){
				tot += this.roll(diceString);
			}
			return ( Math.abs( tot/runs - expected ) < accuracy );
		}
	};
});

