

var canvas,
	ctx,
	simulation,
	randomizer,
	main = [],
	buff = [],
	vertOffset = 0,
	horizOffset = 0,
	randomizeFactor = .5,
	randomizeRate = 100; // number of ticks before randomizing
	fieldsize = 40,
	tickRate = 100,//ms between ticks
	cellsize = 20; //px 

(function() {
    var requestAnimationFrame = 
		window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function init(mode)
{
	console.log(mode);
	while(main.push([]) < fieldsize);
	for(var i =0; i<main.length; i++){
		for(var j=0; j<fieldsize; j++){
			main[i].push(false);
		}
	}
	buff = JSON.parse(JSON.stringify(main));
    canvas = document.getElementById("c");

	resizeCanvas();
	window.onresize = resizeCanvas;
	ctx = canvas.getContext("2d");
	
	if(mode == "screensaver"){	
		vertOffset = 30;
		horizOffset = 110;
		randomizeFactor = .4;
		randomizeRate = 50; // number of ticks before randomizing
		fieldsize = 20;
		tickRate = 250;//ms between ticks
		cellsize = 45; //px 
		randomFill();
		startSimulation(); //kickoff engine
		randomizer = setInterval(randomFill, tickRate*randomizeRate);
	}
	if(mode == "control"){
		randomizeFactor = .5;
		randomizeRate = 0; // number of ticks before randomizing
		canvas.addEventListener("mousedown", click, false);
	}
	
	
	renderUpdate(); // kickoff graphics
}

function click(event){    
	var rect = canvas.getBoundingClientRect();
	var x=event.pageX - rect.left;
	var y=event.pageY - rect.top;
	var gridX=Math.floor((x-horizOffset)/cellsize);
	var	gridY=Math.floor((y-vertOffset)/cellsize);
	main[gridY][gridX] = !main[gridY][gridX];
}

function resizeCanvas(){
	canvas.width  = window.innerWidth - cellsize;
	canvas.height = window.innerHeight - cellsize;
}

function renderUpdate(){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0, canvas.width, canvas.height);

	for(var i =0; i<Math.min(canvas.width/(cellsize+1)-1, fieldsize); i++){
		for(var j=0; j<Math.min(canvas.height/(cellsize+1)-1, fieldsize); j++){
			if(main[j][i]){
				//ctx.fillStyle="rgb("+main[j][i].r+","+main[j][i].g+","+main[j][i].b+")";
				ctx.fillStyle="rgb("+Math.max(0,255-(Math.floor((j+i)*(cellsize*2)/fieldsize)))+",0,0)";
				ctx.fillRect((i*cellsize)+horizOffset, (j*cellsize)+vertOffset, cellsize, cellsize);
			}
			ctx.strokeRect((i*cellsize)+horizOffset, (j*cellsize)+vertOffset, cellsize, cellsize);
		}
	}	
	ctx.strokeStyle = "rgb(127,127,127)";
	ctx.lineWidth=1;
	ctx.stroke();
	
	requestAnimationFrame(renderUpdate);
}

function startSimulation(){
	clearInterval(simulation);
	simulation = setInterval(tick, tickRate);
}
function stopSimulation(){
	clearInterval(simulation);
	clearInterval(randomizer);
}

function tick(){
	/*RULES FOR CONWAY'S GAME OF LIFE
	*  If a dead cell has exactly 3 living neighbors, it becomes alive
	*  If an alive cell has 2 or 3 neighbors, it stays alive
	* If a living cell has 0, 1, 4, 5, 6, 7, or 8 neighbors, it dies.
	*/
	for(var i=0; i<fieldsize; i++){ 
		for(var j=0; j<fieldsize; j++){
			if(!main[j][i] && neighbors(j, i) == 3){ // birth
				buff[j][i] = true;
				/*{
					r:Math.floor(Math.random()*255),
					g:Math.floor(Math.random()*255),
					b:Math.floor(Math.random()*255)
				};*/
			}
			else if (main[j][i] && (neighbors(j,i) == 2 || neighbors(j, i) == 3)){ //persist
				buff[j][i] = main[j][i];
			}
			else{ //die and stay dead
				buff[j][i] = false;
			}
		}
	}
	/*for(var i=0; i<fieldsize; i++){   // Outer border always alive
		if(i%2){buff[0][i] = true;}
		if(i%2 == 0)buff[fieldsize-1][i] = true;
		if(i%2)buff[i][0] = true;
		if(i%2 ==0)buff[i][fieldsize-1] = true;
	}*/
	main = JSON.parse(JSON.stringify(buff)); // blit the buffer to main
}

function neighbors(j, i){
	var count = 0;
	for(var x = Math.max(0, i-1); x <= Math.min(i+1, main.length-1); x++) {
		for(var y = Math.max(0, j-1); y <= Math.min(j+1, main.length-1); y++) {
			if(x !== i || y !== j) {
				if(main[y][x]){count++;}
			}
		}
	}
	return count;
}
function clearGrid(){
	for(var i=0; i<fieldsize; i++){
		for(var j=0; j<fieldsize; j++){
			main[j][i] = false;
		}
	}
}
function randomFill(){
	
	for(var i=0; i<fieldsize; i++){
		for(var j=0; j<fieldsize; j++){
			if(Math.random() < randomizeFactor){
				main[j][i] = true;
			}
			else{
				main[j][i] = false;
			}
		}
	}
}
function boxUpdateTickRate(){
	tickRate = document.getElementById("ratebox").value*1;
	document.getElementById("rateslide").value = tickRate;
	if(simulation){
		clearInterval(simulation);
		simulation = setInterval(tick, tickRate);
	}
}
function slideUpdateTickRate(){
	tickRate = document.getElementById("rateslide").value*1;
	document.getElementById("ratebox").value = tickRate;
	if(simulation){
		clearInterval(simulation);
		simulation = setInterval(tick, tickRate);
	}
}