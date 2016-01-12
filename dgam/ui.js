"use strict";

var ui = (function(){
	var publicAPI = {};
	
	var dom = {button:{}};
	
	function init(){
		dom.controlPanel = document.getElementById("controlPanel");
		dom.button.capitol = document.getElementById("capitol");
		dom.button.water = document.getElementById("water");
		dom.button.capitol.addEventListener("mousedown", selectCapitolBrush);
		dom.button.water.addEventListener("mousedown", selectWaterBrush);
	} publicAPI.init = init;

	function selectCapitolBrush(){ 
		core.selectBrush("capitol"); 
	}
	function selectWaterBrush(){ 
		core.selectBrush("water"); 
	}
	return publicAPI;
}());