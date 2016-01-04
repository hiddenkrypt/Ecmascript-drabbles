"use strict";
var Dice = (function(){
	function rollElement( ministring ){
		var x = Math.abs(ministring.split("d")[0]>>0);
		var y = ministring.split("d")[1]>>0;
		var result = 0;
		while(x--){
			result += Math.floor((Math.random()*y) + 1)
		}
		return ( ministring[0] == '-' )? -result : result;
	}
	function rollElementMin( aString ){
			
	}
	return { 
		roll: function( diceString ){
			if( !diceString.match(/^-?[0-9]+(d[0-9]+?)?(\+-?[0-9]+(d[0-9]+)?)*$/) ){
				throw "Invalid Dice String: "+diceString;
			}
			return diceString.split("+").map( e => rollElement(e) ).reduce( (b,a) => a+b );
		},
		d: function d(s){return s.split("+").map(e=>function(t){var m=Math,x=m.abs(t.split("d")[0]),y=t.split("d")[1]>>0,r=0;while(x--)r+=m.floor((m.random()*y)+1);return (t[0]=='-')?-r:r;}(e)).reduce((b,a)=>a+b);} //code golf 206
	};
});