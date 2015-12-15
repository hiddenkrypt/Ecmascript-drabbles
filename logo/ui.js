var ui = (function(){
	var doc = {};
	
	return{
		initUI: function(){
			doc = {
				bg: document.getElementById("bgColor"),
				fg: document.getElementById("fgColor"),
				punchRate: document.getElementById("punchRate"),
				fadeRate: document.getElementById("fadeRate")
			};
			doc.punchRate.value = core.speed.punch;
		},

		updateColor: function(){
			core.color.bg = doc.bg.value;
			core.color.fg = doc.fg.value;
			core.paintArray();
		},
		updatePunchRate: function(){
			core.speed.punch = doc.punchRate.value
		},
		updateFadeRate: function(){
			core.speed.fade = doc.fadeRate.value
		},

		colorSwap: function(){
			var tempColor = doc.bg.value;
			doc.bg.value = doc.fg.value;
			doc.fg.value = tempColor;
			ui.updateColor();
		},

		run: function(){
			core.paintArray();
		}
	};
}())