function updateColor(){
	var bg = document.getElementById("bgColor");
	var fg = document.getElementById("fgColor");
	color.bg = bg.value;
	color.fg = fg.value;
	paintArray(75);
}

function updateTickRate(){
	var speedo = document.getElementById("speedo");
	speed = speedo.value
}