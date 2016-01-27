"use strict";
var utils = (function(){
	var publicAPI = {};
	
	var d = new Dice();
	publicAPI.d = d;
	
	function buildMap(map){
		map.land = [];
		for(let i=0; i <= map.width; i++){
			let row = [];
			for(let j=0; j <= map.height; j++){
				row.push( {owner:null} );
			}
			map.land.push( row );
		}
	} publicAPI.buildMap = buildMap; 
	
	function territoryGenerationStep( territory, map ){
		territory.lands.forEach( land => {
			var adjacentLands = [
				{x:land.x+1, y:land.y+0},
				{x:land.x-1, y:land.y-0},
				{x:land.x+0, y:land.y+1},
				{x:land.x-0, y:land.y-1}
			];
			
			adjacentLands.forEach(neighbor => {
				if( map.isLandFree( neighbor ) && utils.d.roll("1d2") == 2 ){ // left
					territory.lands.push( neighbor );
				}				
			});
		});
		map.registerLands(territory);
	} publicAPI.territoryGenerationStep = territoryGenerationStep;
	
	function containedInBox(x, y, left, right, top, bottom){
		return x > left && x < right && y > top && y < bottom 
	} publicAPI.containedInBox = containedInBox;
	
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