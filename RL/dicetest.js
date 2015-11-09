"use strict";
var die = new Dice();
function test( diceString, expected ){			
	var tot = 0;
	var accuracy = .1;
	var runs = 100000;
	for( let i=0; i < runs; i++ ){
		tot += die.d(diceString);
	}
	return ( Math.abs( tot/runs - expected ) < accuracy );
}
QUnit.module( "Dice Test", {
	setup: function(){
	},
	teardown: function(){
	}
} );

QUnit.test( "Constants consistency", function( assert ){
	assert.ok( die.d("0", 0), "0 = 0 " );
	assert.ok( die.d("1", 1), "1 = 1 " );
	assert.ok( die.d("-1", -1), "-1 = -1 " );
	assert.ok( die.d("7", 7), "7 = 7 " );
	assert.ok( die.d("-7", -7), "-7 = -7 " );
	assert.ok( die.d("8+1", 9), "8 + 1 = 9" );
	assert.ok( die.d("8+-1", 7), "8 + -1 = 7" );
	assert.ok( die.d("0+-9", 0+-9), "0 + -9 = -9" );
} );
QUnit.test( "Single die rolls", function( assert ){
	assert.ok( test("1d1", 1), "1d1 = 1 at p < .1" );
	assert.ok( test("1d2", 1.5), "1d2 = 1.5 at p < .1" );
	assert.ok( test("1d6", 3.5), "1d6 = 3.5 at p < .1" );
} );
QUnit.test( "Multiple die rolls", function( assert ){
	assert.ok( test("2d6", 7), "2d6 = 7 at p < .1" );
	assert.ok( test("3d6", 10.5), "3d6 = 10.5 at p < .1" );
} );
QUnit.test( "Subtraction", function( assert ){
	assert.ok( test("1d6+-1d6", 0), "1d6+-1d6 = 0 at p < .1" );
	assert.ok( test("1d1+-1", 0), "1d1-1 = 0 at p < .1" );
	assert.ok( test("15+-5", 10), "15-5 = 10 at p < .1" );
	assert.ok( test("1d6+-1d4", 1), "1d6-1d4 = 1 at p < .1" );
} );
QUnit.test( "Complex die rolls", function( assert ){
	assert.ok( test("1+1d6+5d7+13+2d2", 40.5), "1+1d6+5d7+13+2d2 = 39.5 at p < .1" );
	assert.ok( test("1d6+1d6+1d6", 10.5), "1d6+1d6+1d6 = 39.5 at p < .1" );
	assert.ok( test("1d6+5d7+13+2d2+-4", 35.5), "1d6+5d7+13+2d2+-4 = 35.5 at p < .1" );
	assert.ok( test("1d6+5d7+13+-2d2+-4", 29.5), "1d6+5d7+13+-2d2+-4 = 16.5 at p < .1" );
	//3.5+ 
} );
QUnit.test( "bad format", function( assert ){
	
	try{ die.roll("7d"); }
	catch(e){assert.equal( e, "Invalid Dice String", "7d"); }
	
	try{ die.roll("1dd3"); }
	catch(e){assert.equal( e, "Invalid Dice String", "1dd3");}
	
	try{ die.roll("+3"); }
	catch(e){assert.equal( e, "Invalid Dice String", "+3");}
	
	try{ die.roll("d20"); }
	catch(e){assert.equal( e, "Invalid Dice String", "d20");}
} );