var Player = function( aRace, aJob ){
	var race = aRace;
	var job = aJob;
	var	inventory = [];
	var status = {};
	console.log("new player:");
	console.log(race.hp);
	console.log(race.brawn);
	console.log(race.brain);
	console.log(race.hp);
	console.log(job.hp);
	console.log(job.brawn);
	console.log(job.brain);
	console.log(job.hp);
	var stats = {
		level: 1,
		exp: 0,
		hp: die.roll(race.hp) + die.roll(job.hp),
		brawn: die.roll(race.brawn) + die.roll(job.brawn),
		brain: die.roll(race.brain) + die.roll(job.brain),
		speed: die.roll(race.speed) - die.roll(job.speed)
	}
	
	var p = {
		pickup: function( item ){
			if (inventory.hasMatch(item)){
				inventory.find( item ).count++;
			} else{
				inventory.push( item );
			}
		},
		getInventory: function(){ return inventory; },
		getStats: function(){ return stats; }
	};
	return p;
};


var Races = {
	human:{name:"Human",hp:"1d6+10",brawn:"2d4+13",brains:"1d4+10",speed:12},
	slug: {name:"Slug",hp:"1d6+16",brawn:"1d4+7",brains:"1d8+15",speed:15},
	cat:  {name:"Cat",hp:"1d4+8",brawn:"1d6+10",brains:"1d2+10",speed:10}
}
var Jobs = {
	hunter: {
		name:"Hunter",
		hp:"1d8+3",
		brawn:"1d4",
		brains:"1d2",
		speed:"1d4"
	}
}