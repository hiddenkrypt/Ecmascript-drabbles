
var weapons = {
	nibble: {dmg:"1", bonus:"N/A", bonusMultiplier:0, speed: 10} 
	claw: {dmg:"1d3", bonus:"STR", bonusMultiplier:1, speed: 10}
	bite: {dmg:"1d4", bonus:"STR", bonusMultiplier:.5, speed: 10}
	punch: {dmg:"1d3", bonus:"STR", bonusMultiplier:1, speed: 10}
	club: {dmg:"1d6", bonus:"STR", bonusMultiplier:1.5, speed: 14}
	dagger: {dmg:"1d6", bonus:"STR", bonusMultiplier:1, speed: 6}
	shortSword: {dmg:"1d8", bonus:"STR", bonusMultiplier:1, speed: 10}
};
var traits = {
	filth: {},
	tiny: {},
	small: {},
	medium: {},
	multiattack: function( attacks ){ return {type:"attack", value:"multiattack("+attacks+")"},
	fracture: function( creature, rate ){},
	coward: function( ratio ){},
};



var monsters = {
	rat: { 
		name:		"Rat",
		symbol:		'r',
		HD:			"2d4",
		STR:		"1d3+1",
		INT:		"1",
		weapons:[weapons.nibble, weapons.claw],
		traits:[traits.filth, traits.tiny]
	},
	direRat: { 
		name:		"Dire Rat",
		symbol:		'R',
		HD:			"4d4",
		STR:		"2d3+1",
		INT:		"1d2",
		weapons:[weapons.nibble, weapons.claw, weapons.bite],
		traits:[traits.filth, traits.small]
	},
	ratKing: { 
		name:		"Rat King",
		symbol:		'K',
		HD:			"8d6",
		STR:		"4d4+4",
		INT:		"2d6",
		weapons:[weapons.nibble, weapons.claw],
		traits:[traits.disease, traits.medium, traits.horrifying, traits.multiattack(6), fracture(monsters.rat, 8)]
	},
	gobbo: { 
		name:		"Gobbo",
		symbol:		'g',
		HD:			"2d6",
		STR:		"1d6+4",
		INT:		"1d6+4",
		weapons:[weapons.punch, weapons.club, weapons.dagger, weapons.shortSword],
		traits:[traits.medium, traits.coward(2)]
	}
}	