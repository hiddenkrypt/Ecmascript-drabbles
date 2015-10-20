"use strict";

var	ctx =  {}, 
	canvas = {},
	grid = [];
	
var width = 332, 
	height = 166;
	
var gridOffsetX = width / 10,
	gridOffsetY = height/10,
	notes = 8*4, // four measures of eighth notes
	noteSpace = 16,
	gridSquareWidth = Math.floor((width-(gridOffsetX*1.5))/notes),
	gridSquareHeight = Math.floor((height-(gridOffsetY*1.5))/noteSpace);

var tracker = null;

var playBar = {x:0};
var instruments = [];
function setWaveForm(type){
	if(instruments[15])instruments[15].play();
	instruments = [];
	instruments.push(T(type, {freq:554.36})); //
	instruments.push(T(type, {freq:523.25})); //8
	instruments.push(T(type, {freq:493.88})); //7
	instruments.push(T(type, {freq:466.16})); // 
	instruments.push(T(type, {freq:440.00})); //6 
	instruments.push(T(type, {freq:415.30})); // 
	instruments.push(T(type, {freq:392.00})); //5
	instruments.push(T(type, {freq:369.99})); // 
	instruments.push(T(type, {freq:349.23})); //4
	instruments.push(T(type, {freq:329.63})); //3
	instruments.push(T(type, {freq:311.13})); //
	instruments.push(T(type, {freq:293.66})); //2
	instruments.push(T(type, {freq:277.18})); //
	instruments.push(T(type, {freq:261.63})); //0 root (MidC)
	instruments.push({play:function(){}, pause: function(){}});
	instruments.push(
	{
		play:function(){
			instruments.forEach(function(banger){
				banger.pause();
			});
		}, 
		pause: function(){}
	});
}	
function init(){
	setWaveForm("sin");
	for (var x=0; x < notes; x++){
		var bob = [];
		for (var y=0; y < noteSpace; y++){
			bob.push(false);
		}
		grid.push(bob);
	}
	
	for (var x=0; x < notes; x++){
		grid[x][noteSpace-1] = true;
	}
	canvas = document.getElementById("c");
	ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	canvas.addEventListener("mousedown", click, false);
	renderUpdate();
}

function click(event){    
	var rect = canvas.getBoundingClientRect();
	var x=event.pageX - rect.left - gridOffsetX;
	var y=event.pageY - rect.top - gridOffsetY;
	x = Math.floor(x / gridSquareWidth);
	y = Math.floor(y / gridSquareHeight);
	if(x >= 0 && x < notes && y >=0 && y < noteSpace){
	
		for (var i=0; i < noteSpace; i++){
			grid[x][i] = false;
		}
		grid[x][y] = true;
		generateTitleFromGrid();
	}
}

(function() {
    var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function renderUpdate(){
	ctx.fillStyle = "#111111";
	ctx.fillRect(0,0, width, height);
	ctx.lineWidth=2;
	ctx.strokeStyle = "#696969";
	for (var x=0; x < notes; x++){
		ctx.strokeRect(gridOffsetX+(x*gridSquareWidth), gridOffsetY+((noteSpace-2)*gridSquareHeight), gridSquareWidth,gridSquareHeight);
		ctx.strokeRect(gridOffsetX+(x*gridSquareWidth), gridOffsetY+((noteSpace-1)*gridSquareHeight), gridSquareWidth,gridSquareHeight);
	}
	ctx.stroke();
	
	ctx.strokeStyle = "#da3a3f";
	ctx.lineWidth=1;
	for (var x=0; x < notes; x++){
		for (var y=0; y < noteSpace-2; y++){
			ctx.strokeRect(gridOffsetX+(x*gridSquareWidth), gridOffsetY+(y*gridSquareHeight), gridSquareWidth,gridSquareHeight);
		}
	}
	ctx.stroke();
	
	ctx.strokeStyle = "#dadadf";
	ctx.lineWidth=3;
	for (var i=0; i < 4; i++){
		ctx.strokeRect(gridOffsetX+(i*(gridSquareWidth*8)),gridOffsetY, gridSquareWidth*8, gridSquareHeight*16);
	}
	ctx.stroke();
	
	ctx.fillStyle = "#ffff60";
	for (var x=0; x < notes; x++){
		for (var y=0; y < noteSpace; y++){
			if(grid[x][y]){
				ctx.fillRect(gridOffsetX+(x*gridSquareWidth), gridOffsetY+(y*gridSquareHeight), gridSquareWidth,gridSquareHeight);
			}
		}
	}
	if(tracker){
		ctx.fillStyle = "#efef60";
		ctx.fillRect(gridOffsetX-1+(playBar.x*gridSquareWidth)+gridSquareWidth/2, gridOffsetY, 2, height-(gridOffsetY*2));
	}

	ctx.font="10px Courier";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Halt", gridOffsetX-27, gridOffsetY+(16*gridSquareHeight));
	ctx.fillText("Hold",gridOffsetX-27, gridOffsetY+(15*gridSquareHeight)-1);
	ctx.fillText("Root",gridOffsetX-27, gridOffsetY+(14*gridSquareHeight)-2);
	ctx.fillText(" 2nd", gridOffsetX-27, gridOffsetY+(12*gridSquareHeight)-3);
	ctx.fillText(" 3rd", gridOffsetX-27, gridOffsetY+(10*gridSquareHeight)-3);
	ctx.fillText(" 4th", gridOffsetX-27, gridOffsetY+(9*gridSquareHeight)-2);
	ctx.fillText(" 5th", gridOffsetX-27, gridOffsetY+(7*gridSquareHeight)-3);
	ctx.fillText(" 6th", gridOffsetX-27, gridOffsetY+(5*gridSquareHeight)-2);
	ctx.fillText(" 7th", gridOffsetX-27, gridOffsetY+(3*gridSquareHeight)-2);
	ctx.fillText(" Oct", gridOffsetX-27, gridOffsetY+(2*gridSquareHeight)-3);
	requestAnimationFrame(renderUpdate);
}

function play(){
	var rawBPM = document.getElementById("bpm").value;
	if(!(rawBPM == rawBPM*1)){
		console.log("invalid input for bpm, defaulting to 120");
		rawBPM = 120;
	}
	var ticRate = Math.round(((60 / rawBPM) * 1000)/2); 
	console.log(ticRate);
	tracker = setInterval(tick, ticRate);
	document.getElementById("play").value = "Stop";
	document.getElementById("play").onclick = function(){stop();};

}

function stop(){
	clearInterval(tracker);
	tracker = null;
	document.getElementById("play").value = "Play";
	document.getElementById("play").onclick = function(){play();};
	instruments[15].play();
	playBar.x = 0;
}

function tick(){
	playBar.x++;
	if(playBar.x >= notes){playBar.x = 0}
	for(var y=0; y<noteSpace; y++){
		if(grid[playBar.x][y]){
			if(y != 14){
				instruments[15].play();
			}
			instruments[y].play();
			console.log("dingle: "+y);
		}
	}
}


function generateTitleFromGrid(){
	var name = [];
	for(var i =0; i < 16; i+=2){//go byte by byte (that is, two eighth notes at a time)
		var msd, lsd;
		for(var j=0; j <16; j++){ // high nybble
			if(grid[2*i][j]){
				msd = j;
			}
			if(grid[(2*i)+1][j]){//low nybble
				lsd = j;
			}
		}
		name.push(msd*16 + lsd);
	}
	var title  = "";
	name.forEach(function(byt){
		title +=String.fromCharCode((byt*1)+255);
	});
	document.getElementById("tit").value = title;

}
function generateGridFromTitle(){

}

function updateRoot(){
	var root = document.getElementById("root");
	var roothz = root.options[root.selectedIndex].value; 
}