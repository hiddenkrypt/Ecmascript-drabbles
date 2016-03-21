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

function stats( set ){
	this.max = Math.max.apply(set);
	this.min = Math.min.apply(set);
	this.mean = set.reduce((a,b)=>a+b) / set.length;
	this.stDev = Math.sqrt(set.map(e=>Mean-e).map(e=>e*e).reduce((a,b)=>a+b)/set.length);
}
function approximatlyEqual(x, y, accuracy){
	return Math.abs(x-y) < accuracy; 
}


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

QUnit.module( "rollVerbose() basics", { setup: function(){},teardown: function(){} } );

QUnit.test( "results object", function( assert ){
	var roll,ds,res,dieSize, dieNum;
	dieSize = 6;
	dieNum = 15;
	ds=dieNum+"d"+dieSize; //15d6
	res = die.rollVerbose(ds);
	assert.equal(res.roll, ds, ds+": roll string match");
	assert.equal(res.values.length, dieNum, ds+": values length");
	
	dieSize = 1;
	dieNum = 15;
	ds=dieNum+"d"+dieSize; //15d1
	res = die.rollVerbose(ds);
	assert.equal(res.roll, ds, ds+": roll string match");
	assert.equal(res.values.length, dieNum, ds+": values length");
	assert.equal(res.rollResults, "1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1", ds+": Roll results");
	assert.equal(res.total, 15, ds+": expected total 15");
	assert.equal(res.toString, "Rolled "+ds+" (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1) = 15", ds+": toString");
	
	
	dieSize = 8;
	dieNum = 1;
	ds = "8";
	res = die.rollVerbose(ds);
	assert.equal(res.roll, ds, ds+": roll string match");
	assert.equal(res.values.length, dieNum, ds+": values length");
	assert.equal(res.rollResults, "8", ds+": Roll results");
	assert.equal(res.total, 8, ds+": expected total 8");
	assert.equal(res.toString, "Rolled "+ds+" (8) = 8", ds+": toString");
} );


QUnit.test( "constants", function( assert ){
	var roll,ds,res;
	
	ds="6"
	res = die.rollVerbose(ds);
	assert.equal(res.roll, ds, ds+": roll string match");
	assert.equal(res.values.length, 1, ds+": values length");
	assert.equal(res.total, 6, ds+": expected total 6");
	assert.equal(res.rollResults, "6", ds+": Roll results");
	assert.equal(res.toString, "Rolled "+ds+" (6) = 6", ds+": toString");
	
	ds="1"
	res = die.rollVerbose(ds);
	assert.equal(res.roll, ds, ds+": roll string match");
	assert.equal(res.values.length, 1, ds+": values length");
	assert.equal(res.total, 1, ds+": expected total 1");
	assert.equal(res.rollResults, "1", ds+": Roll results");
	assert.equal(res.toString, "Rolled "+ds+" (1) = 1", ds+": toString");
	
	ds="1+4"
	res = die.rollVerbose(ds);
	assert.equal(res.roll, ds, ds+": roll string match");
	assert.equal(res.values.length, 2, ds+": values length");
	assert.equal(res.total, 5, ds+": expected total 5");
	assert.equal(res.rollResults, "1, 4", ds+": Roll results");
	assert.equal(res.toString, "Rolled "+ds+" (1, 4) = 5", ds+": toString");
	
	ds="1-4"
	res = die.rollVerbose(ds);
	assert.equal(res.roll, ds, ds+": roll string match");
	assert.equal(res.values.length, 2, ds+": values length");
	assert.equal(res.total, -3, ds+": expected total -3");
	assert.equal(res.rollResults, "1, -4", ds+": Roll results");
	assert.equal(res.toString, "Rolled "+ds+" (1, -4) = -3", ds+": toString");

});


QUnit.module( "rollVerbose() statistic analysis", { setup: function(){}, teardown: function(){} });
QUnit.test( "Single Die statistics", function(assert){

	var ds, results, rolls, expected;
	
	ds="1d6";
	expected = { max: 6, min: 1, mean: 3.5, stDev: Math.sqrt(Math.pow(6-1+1,2)-1/12) };
	rolls = [];
	for(let i=0; i < 10000; i++){
		rolls.push(die.rollVerbose(ds).total);
	}
	results = new stats(rolls.reduce((a,b)=> a.concat(b)));
	assert.equal( results.max, expected.max, ds+" max" );
	assert.equal( results.min, expected.min, ds+" min" );
	assert.ok(approximatlyEqual(results.mean, expected.mean, .01), ds+" Mean");
	assert.ok(approximatlyEqual(results.stDev, expected.stDev, .1), ds+" Mean");
	
		
	ds="1d20";
	expected = { max: 20, min: 1, mean: 10.5, stDev: Math.sqrt(Math.pow(20-1+1,2)-1/12) };
	rolls = [];
	for(let i=0; i < 10000; i++){
		rolls.push(die.rollVerbose(ds).total);
	}
	results = new stats(rolls.reduce((a,b)=> a.concat(b)));
	assert.equal( results.max, expected.max, ds+" max" );
	assert.equal( results.min, expected.min, ds+" min" );
	assert.ok(approximatlyEqual(results.mean, expected.mean, .01), ds+" Mean");
	assert.ok(approximatlyEqual(results.stDev, expected.stDev, .1), ds+" Mean");
	
		
		
	ds="1d100";
	expected = { max: 100, min: 1, mean: 50.5, stDev: Math.sqrt(Math.pow(100-1+1,2)-1/12) };
	rolls = [];
	for(let i=0; i < 10000; i++){
		rolls.push(die.rollVerbose(ds).total);
	}
	results = new stats(rolls.reduce((a,b)=> a.concat(b)));
	assert.equal( results.max, expected.max, ds+" max" );
	assert.equal( results.min, expected.min, ds+" min" );
	assert.ok(approximatlyEqual(results.mean, expected.mean, .01), ds+" Mean");
	assert.ok(approximatlyEqual(results.stDev, expected.stDev, .1), ds+" Mean");
	
	

});
