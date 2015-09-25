"use strict";
var code = {
	init: function(){
		 drabble.loader.begin();
		var myID1 = drabble.loader.registerItem();
		var myID2 = drabble.loader.registerItem();
		setTimeout( function(){ drabble.loader.clearItem(myID1); }, 100 );
		setTimeout( function(){ drabble.loader.clearItem(myID2); }, 300 );
		zedgine.init();
	}
	,canvas:{
		WIDTH: 600,
		HEIGHT: 400
	}
	,start: function(){
		zedgine.initLoaded();
		zedgine.test();
	}
};


var zedgine  = zedgine||(function(){
	var sprite = 0;
	var cellx = 100, celly= 100;
	var spritesheets =  {
		bloodcells: {file: new Image(), loadID:0, mappings:[]}
	}
	var z = {
		init: function(){
			for(let i = 0; i < 7; i++){
				let row = [];
				for( let j = 0; j < 5; j++){
					row.push( { x:20*j, y:20*i } );
				}
				spritesheets.bloodcells.mappings.push( row );
			}
			spritesheets.bloodcells.file.src = 'res/red.png';
			spritesheets.bloodcells.file.loadID = drabble.loader.registerItem();
			spritesheets.bloodcells.file.onload = function(){ drabble.loader.clearItem( spritesheets.bloodcells.file.loadID ); };
		}
		,initLoaded: function(){
			redBloodCellManager.setSpritesheet( spritesheets.bloodcells );
		}
		,test: function(){
			redBloodCellManager.addCell();
		}
		,animation: function(){
			var ctx = drabble.ctx;
			ctx.fillRect(0,0,10,10);
			redBloodCellManager.tick();
			redBloodCellManager.draw( ctx );
			requestAnimationFrame(z.animation);
		}
	};
	var redBloodCellManager = (function(){
		var cells = [];
		var bloodcells = {};
		function createRandomCell(){};
		return {
			setSpritesheet: function( sheet ){ bloodcells = sheet; }
			,addCell: function(){
				var newCell = {
					x:50
					,y:50
					,sprite:0
					,step: function(){
						this.x += Math.floor(Math.random()*4+1) - 2;
						this.y += Math.floor(Math.random()*4+1) - 2;
						if(Math.random < 0.2){ this.sprite = Math.floor(Math.random()*5); }
					}
					,draw: function( ctx ){
						ctx.drawImage( 
							bloodcells.file, 
							bloodcells.mappings[0][this.sprite].x, 
							bloodcells.mappings[0][this.sprite].y,
							20, 20,
							this.x, this.y, 
							20, 20
						);
					}
				};
				cells.push( newCell )
			}
			,addCells: function( number ){
				while( number-- ){ this.addCell(); }
			}
			,addThisCell: function( cell ){}
			,removeCell: function( id ){}
			,getCellCount: function(){ return cells.length; }
			,tick: function(){
				cells.forEach( function( cell ){ cell.step(); } );
			}
			,draw: function( ctx ){

			}
		}
		
	})();
				
	return z;
}());