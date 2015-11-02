/*rltests.js						
*/

/* 3xamples
QUnit.module( "name", {
	setup: function(){
	},
	teardown: function(){
	}
} );

QUnit.test( "name", function( assert ){
	assert.ok( boolIn, "message" );
	assert.equal( in, out, "message" );
} ); */
var die;
	
QUnit.module( "Dice Test", {
	setup: function(){
		die = new Dice();
	},
	teardown: function(){
	}
} );

QUnit.test( "Constants consistency", function( assert ){
	assert.ok( die.test("7", 7), "7 = 7 at p < .1" );
	assert.ok( die.test("8+1", 9), "8 + 1 = 9 at p < .1" );
} );
QUnit.test( "Single die rolls", function( assert ){
	assert.ok( die.test("1d1", 1), "1d1 = 1 at p < .1" );
	assert.ok( die.test("1d2", 1.5), "1d2 = 1.5 at p < .1" );
	assert.ok( die.test("1d6", 3.5), "1d6 = 3.5 at p < .1" );
} );
QUnit.test( "Multiple die rolls", function( assert ){
	assert.ok( die.test("2d6", 7), "2d6 = 7 at p < .1" );
	assert.ok( die.test("3d6", 10.5), "3d6 = 10.5 at p < .1" );
} );
QUnit.test( "Subtraction", function( assert ){
	assert.ok( die.test("1d6+-1d6", 0), "1d6+-1d6 = 0 at p < .1" );
	assert.ok( die.test("1d1+-1", 0), "1d1-1 = 0 at p < .1" );
	assert.ok( die.test("15+-5", 10), "15-5 = 10 at p < .1" );
	assert.ok( die.test("1d6+-1d4", 1), "1d6-1d4 = 1 at p < .1" );
} );
QUnit.test( "Complex die rolls", function( assert ){
	assert.ok( die.test("1+1d6+5d7+13+2d2", 40.5), "1+1d6+5d7+13+2d2 = 39.5 at p < .1" );
	assert.ok( die.test("1d6+1d6+1d6", 10.5), "1d6+1d6+1d6 = 39.5 at p < .1" );
	assert.ok( die.test("1d6+5d7+13+2d2+-4", 35.5), "1d6+5d7+13+2d2+-4 = 35.5 at p < .1" );
	assert.ok( die.test("1d6+5d7+13+-2d2+-4", 29.5), "1d6+5d7+13+-2d2+-4 = 16.5 at p < .1" );
	//3.5+ 
} );
QUnit.test( "bad format", function( assert ){
	try{ die.test("7d", 7); }
	catch(e){
		assert.equal( e, "Invalid Dice String", "7d");
	}
	try{ die.test("1dd3", 7); }
	catch(e){
		assert.equal( e, "Invalid Dice String", "1dd3");
	}
	try{ die.test("+3", 9); }
	catch(e){
		assert.equal( e, "Invalid Dice String", "+3");
	}
} );