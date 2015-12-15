var doc = {};

function initUI(){
	doc = {
		bg: document.getElementById("bgColor"),
		fg: document.getElementById("fgColor"),
		punchRate: document.getElementById("punchRate"),
		fadeRate: document.getElementById("fadeRate")
	};
	doc.punchRate.value = speed.punch;
}

function updateColor(){
	color.bg = doc.bg.value;
	color.fg = doc.fg.value;
	paintArray();
}

function updatePunchRate(){
	speed.punch = doc.punchRate.value
}
function updateFadeRate(){
	speed.fade = doc.fadeRate.value
}

function colorSwap(){
	var tempColor = doc.bg.value;
	doc.bg.value = doc.fg.value;
	doc.fg.value = tempColor;
	updateColor();
}

function run(){
	paintArray();
}