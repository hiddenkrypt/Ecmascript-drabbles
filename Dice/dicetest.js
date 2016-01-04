"use strict";
var die = new Dice();

function testAverage( method, diceString, expected ){			
	var tot = 0;
	var accuracy = .2;
	var runs = 10000;
	for( let i=0; i < runs; i++ ){
		tot += method(diceString);
	}
	return ( Math.abs( tot/runs - expected ) < accuracy );
}

function testRange ( method, diceString, lowBounds, highBounds ){
	var runs = 100;
	var roll = method(diceString);
	var max = roll;
	var min = roll;
	for( let i=0; i < runs; i++ ){
		roll = method(diceString);
		max = (max < roll)? roll : max;
		min = (min < roll)? roll : min;
	}
	return (lowBounds <= min && highBounds >= max);
}

// QUnit.module( "rollEach() output testing", { setup: function(){},teardown: function(){} } );

// QUnit.test( "results length", function( assert ){
	// assert.equal( die.rollEach("1d2").rolls.length, 1, "1d2: one die returns one roll" );
	// assert.equal( die.rollEach("3d2").rolls.length, 3, "3d2: returns 3" );
	// assert.equal( die.rollEach("10d6").rolls.length, 1, "10d6: returns 10" );
	// assert.equal( die.rollEach("4d4+1d6+-1d8").length, 6, "4d4+1d6+-1d8: returns 6" );
// }

// QUnit.test( "results probability", function( assert ){

// }

QUnit.module( "roll() basics", { setup: function(){},teardown: function(){} } );
QUnit.test( "Constants consistency", function( assert ){
	assert.ok( die.roll("1d4", 0), "0 = 0 " );
	assert.ok( die.roll("1d7", 1), "1 = 1 " );
	assert.ok( die.roll("-1", -1), "-1 = -1 " );
	assert.ok( die.roll("7", 7), "7 = 7 " );
	assert.ok( die.roll("-7", -7), "-7 = -7 " );
	assert.ok( die.roll("8+1", 9), "8 + 1 = 9" );
	assert.ok( die.roll("8+-1", 7), "8 + -1 = 7" );
	assert.ok( die.roll("0+-9", 0+-9), "0 + -9 = -9" );
} );

QUnit.test( "bad format", function( assert ){
	
	try{ die.roll("7d"); }
	catch(e){assert.equal( e.message, "Invalid Dice String Argument: 7d", "7d"); }
	
	try{ die.roll("1dd3"); }
	catch(e){assert.equal( e.message, "Invalid Dice String Argument: 1dd3", "1dd3");}
	
	try{ die.roll("+3"); }
	catch(e){assert.equal( e.message, "Invalid Dice String Argument: +3", "+3");}
	
	try{ die.roll("d20"); }
	catch(e){assert.equal( e.message, "Invalid Dice String Argument: d20", "d20");}
} );


QUnit.module( "roll() range testing", { setup: function(){},teardown: function(){} } );


QUnit.test( "singe die", function( assert ){
	assert.ok( testRange( die.roll,"1d2", 1,2), "0 = 0 " );
	assert.ok( testRange( die.roll,"1d6", 1,6), "0 = 0 " );
	assert.ok( testRange( die.roll,"1d23", 1,23), "0 = 0 " );
} );

QUnit.test( "group die", function( assert ){
	assert.ok( testRange( die.roll,"4d2", 4,8), "0 = 0 " );
	assert.ok( testRange( die.roll,"5d6", 5,30), "0 = 0 " );
	assert.ok( testRange( die.roll,"2d23", 2,46), "0 = 0 " );
} );

QUnit.test( "complex die", function( assert ){
	assert.ok( testRange( die.roll,"2d2+4+1d6", 7,14), "0 = 0 " );
	assert.ok( testRange( die.roll,"1d17+1d1+7", 9,27), "0 = 0 " );
	assert.ok( testRange( die.roll,"1d23+-1d6+-28", -33,-6), "0 = 0 " );
} );


QUnit.module( "roll() probability testing", { setup: function(){},teardown: function(){} } );

QUnit.test( "Single die rolls", function( assert ){
	assert.ok( testAverage( die.roll,"1d1", 1), "1d1 = 1 at p < .1" );
	assert.ok( testAverage( die.roll,"1d2", 1.5), "1d2 = 1.5 at p < .1" );
	assert.ok( testAverage( die.roll,"1d6", 3.5), "1d6 = 3.5 at p < .1" );
	assert.ok( testAverage( die.roll,"1d21", 11), "1d21 = 11 at p < .1" );
} );
QUnit.test( "Multiple die rolls", function( assert ){
	assert.ok( testAverage( die.roll,"2d6", 7), "2d6 = 7 at p < .1" );
	assert.ok( testAverage( die.roll,"3d6", 10.5), "3d6 = 10.5 at p < .1" );
} );
QUnit.test( "Subtraction", function( assert ){
	assert.ok( testAverage( die.roll,"1d6+-1d6", 0), "1d6+-1d6 = 0 at p < .1" );
	assert.ok( testAverage( die.roll,"1d1+-1", 0), "1d1-1 = 0 at p < .1" );
	assert.ok( testAverage( die.roll,"15+-5", 10), "15-5 = 10 at p < .1" );
	assert.ok( testAverage( die.roll,"1d6+-1d4", 1), "1d6-1d4 = 1 at p < .1" );
} );
QUnit.test( "Complex die rolls", function( assert ){
	assert.ok( testAverage( die.roll,"1+1d6+5d7+13+2d2", 40.5), "1+1d6+5d7+13+2d2 = 39.5 at p < .1" );
	assert.ok( testAverage( die.roll,"1d6+1d6+1d6", 10.5), "1d6+1d6+1d6 = 39.5 at p < .1" );
	assert.ok( testAverage( die.roll,"1d6+5d7+13+2d2+-4", 35.5), "1d6+5d7+13+2d2+-4 = 35.5 at p < .1" );
	assert.ok( testAverage( die.roll,"1d6+5d7+13+-2d2+-4", 29.5), "1d6+5d7+13+-2d2+-4 = 16.5 at p < .1" );
	//3.5+ 
} );

QUnit.module( "d() range testing", { setup: function(){},teardown: function(){} } );
QUnit.test( "singe die", function( assert ){
	assert.ok( testRange( die.d,"1d2", 1,2), "0 = 0 " );
	assert.ok( testRange( die.d,"1d6", 1,6), "0 = 0 " );
	assert.ok( testRange( die.d,"1d23", 1,23), "0 = 0 " );
} );

QUnit.test( "group die", function( assert ){
	assert.ok( testRange( die.d,"4d2", 4,8), "0 = 0 " );
	assert.ok( testRange( die.d,"5d6", 5,30), "0 = 0 " );
	assert.ok( testRange( die.d,"2d23", 2,46), "0 = 0 " );
} );

QUnit.test( "complex die", function( assert ){
	assert.ok( testRange( die.d,"2d2+4+1d6", 7,14), "0 = 0 " );
	assert.ok( testRange( die.d,"1d17+1d1+7", 9,27), "0 = 0 " );
	assert.ok( testRange( die.d,"1d23+-1d6+-28", -33,-6), "0 = 0 " );
} );

QUnit.module( "d() probability testing", { setup: function(){},teardown: function(){} } );

QUnit.test( "Single die rolls", function( assert ){
	assert.ok( testAverage( die.roll,"1d1", 1), "1d1 = 1 at p < .1" );
	assert.ok( testAverage( die.d,"1d2", 1.5), "1d2 = 1.5 at p < .1" );
	assert.ok( testAverage( die.d,"1d6", 3.5), "1d6 = 3.5 at p < .1" );
	assert.ok( testAverage( die.d,"1d21", 11), "1d21 = 11 at p < .1" );
} );
QUnit.test( "Multiple die rolls", function( assert ){
	assert.ok( testAverage( die.d,"2d6", 7), "2d6 = 7 at p < .1" );
	assert.ok( testAverage( die.d,"3d6", 10.5), "3d6 = 10.5 at p < .1" );
} );
QUnit.test( "Subtraction", function( assert ){
	assert.ok( testAverage( die.d,"1d6+-1d6", 0), "1d6+-1d6 = 0 at p < .1" );
	assert.ok( testAverage( die.d,"1d1+-1", 0), "1d1-1 = 0 at p < .1" );
	assert.ok( testAverage( die.d,"15+-5", 10), "15-5 = 10 at p < .1" );
	assert.ok( testAverage( die.d,"1d6+-1d4", 1), "1d6-1d4 = 1 at p < .1" );
} );
QUnit.test( "Complex die rolls", function( assert ){
	assert.ok( testAverage( die.d,"1+1d6+5d7+13+2d2", 40.5), "1+1d6+5d7+13+2d2 = 39.5 at p < .1" );
	assert.ok( testAverage( die.d,"1d6+1d6+1d6", 10.5), "1d6+1d6+1d6 = 39.5 at p < .1" );
	assert.ok( testAverage( die.d,"1d6+5d7+13+2d2+-4", 35.5), "1d6+5d7+13+2d2+-4 = 35.5 at p < .1" );
	assert.ok( testAverage( die.d,"1d6+5d7+13+-2d2+-4", 29.5), "1d6+5d7+13+-2d2+-4 = 16.5 at p < .1" );
	//3.5+ 
} );
QUnit.module( "d() basics", { setup: function(){},teardown: function(){} } );
QUnit.test( "Constants consistency", function( assert ){
	assert.ok( die.d("1d4", 0), "0 = 0 " );
	assert.ok( die.d("1d7", 1), "1 = 1 " );
	assert.ok( die.d("-1", -1), "-1 = -1 " );
	assert.ok( die.d("7", 7), "7 = 7 " );
	assert.ok( die.d("-7", -7), "-7 = -7 " );
	assert.ok( die.d("8+1", 9), "8 + 1 = 9" );
	assert.ok( die.d("8+-1", 7), "8 + -1 = 7" );
	assert.ok( die.d("0+-9", 0+-9), "0 + -9 = -9" );
} );
