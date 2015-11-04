
"use strict";
var die = {};
var stats = {
	hp:0,
	brain:0,
	brawn:0,
	speed:0,
	level:1,
	xp:0,
	max_hp:0,
	max_brain:0,
	max_brawn:0,
	max_speed:0,
	max_level:1,
	max_xp:0,
	min_hp:0,
	min_brain:0,
	min_brawn:0,
	min_speed:0,
	min_level:1,
	min_xp:0
};
var player = {};

QUnit.module( "Player stat bounds", {
	setup: function(){
		die = new Dice();
		var runs= 10000;
		for( let i= 0; i < runs; i ++){
			player = new Player( Races.human, Jobs.hunter );
			stats.hp += player.getStats().hp;
			stats.brain += player.getStats().brain;
			stats.brawn += player.getStats().brawn;
			stats.speed += player.getStats().speed;
			stats.level += player.getStats().level;
			stats.exp += player.getStats().exp;
			stats.max_hp    = stats.max_hp >=  player.getStats().hp   ?stats.max_hp:player.getStats().hp; 
			stats.max_brain = stats.max_brain>=player.getStats().brain?stats.max_brain:player.getStats().brain; 
			stats.max_brawn = stats.max_brawn>=player.getStats().brawn?stats.max_brawn:player.getStats().brawn; 
			stats.max_speed = stats.max_speed>=player.getStats().speed?stats.max_speed:player.getStats().speed; 
			stats.min_hp    = stats.min_hp <=  player.getStats().hp   ?stats.min_hp:player.getStats().hp; 
			stats.min_brain = stats.min_brain<=player.getStats().brain?stats.min_brain:player.getStats().brain; 
			stats.min_brawn = stats.min_brawn<=player.getStats().brawn?stats.min_brawn:player.getStats().brawn; 
			stats.min_speed = stats.min_speed<=player.getStats().speed?stats.min_speed:player.getStats().speed; 
		}
		stats.hp = stats.hp / runs;
		stats.brain = stats.brain / runs;
		stats.brawn = stats.brawn / runs;
		stats.speed = stats.speed / runs;
		stats.level = stats.level / runs;
		stats.exp = stats.exp / runs;
	},
	teardown: function(){
		
	}
} );

QUnit.test( "HP bounds", function( assert ){
	assert.ok( ( stats.hp > 15 && stats.hp < 27 ), "HP average between 15 and 27" );
	assert.ok( ( stats.max_hp >= 15 && stats.max_hp <= 27 ), "HP max between 15 and 27" );
	assert.ok( ( stats.min_hp >= 15 && stats.min_hp <= 27 ), "HP min between 15 and 27" );
} );