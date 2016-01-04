"use strict";
core.utils ={
	x:1,
	buildMap: function(map){
		map.land = [];
		for(let i=0; i <= map.width; i++){
			let row = [];
			for(let j=0; j <= map.height; j++){
				row.push( {owner:null} );
			}
			map.land.push( row );
		}
	},
	territoryGenerate: function( territory, map ){
		territory.lands.forEach( e => {
			if( map.isLandFree( e.x-1, e.y ) && d.roll("1d2") == 2 ){ // left
				territory.lands.push( {x: e.x-1, y: e.y } );
			}
			if( map.isLandFree( e.x+1, e.y ) && d.roll("1d2") == 2 ){ // right
				territory.lands.push( {x: e.x+1, y: e.y } );
			}
			if( map.isLandFree( e.x, e.y-1 ) && d.roll("1d2") == 2 ){ // top
				territory.lands.push( {x: e.x, y: e.y-1 } );
			}
			if( map.isLandFree( e.x, e.y+1 ) && d.roll("1d2") == 2 ){ // botm
				territory.lands.push( {x: e.x, y: e.y+1 } );
			}
		});
		map.registerLands(territory);
	},
	containedInBox: function(x, y, left, right, top, bottom){
		return x > left && x < right && y > top && y < bottom 
	} 
};