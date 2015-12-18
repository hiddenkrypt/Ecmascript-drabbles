var ui = (function(){
	var doc = {};
	
	return{
		initUI: function(){
			doc = {
				bg: document.getElementById("bgColor"),
				fg: document.getElementById("fgColor"),
				fadeRate: document.getElementById("fadeRate"),
				punchRate: document.getElementById("punchRate"),
				fadeRateDisplay: document.getElementById("fadeRateDisplay"),
				punchRateDisplay: document.getElementById("punchRateDisplay"),
				fadeStyle: document.getElementById("fadeStyle")
			};
			doc.punchRate.value = core.speed.punch;
			ui.updatePunchRate();
			ui.updateFadeRate();
			ui.run();
		},

		updateColor: function(){
			core.color.bg = doc.bg.value;
			core.color.fg = doc.fg.value;
		},
		updatePunchRate: function(){
			core.speed.punch = doc.punchRate.value;
			doc.punchRateDisplay.innerHTML = doc.punchRate.value;
		},
		updateFadeRate: function(){
			core.speed.fade = doc.fadeRate.value;
			doc.fadeRateDisplay.innerHTML = doc.fadeRate.value;
		},

		colorSwap: function(){
			var tempColor = doc.bg.value;
			doc.bg.value = doc.fg.value;
			doc.fg.value = tempColor;
			ui.updateColor();
		},

		run: function(){
			core.runAnimation();
		},
		fadeToggle: function(){
			var fadeStyles = {
				"Fade In" : "Fade Out",
				"Fade Out" : "Fade InOut",
				"Fade InOut" : "No Fade",
				"No Fade" : "Fade In"
			};			
			doc.fadeStyle.value = fadeStyles[doc.fadeStyle.value];
			if(doc.fadeStyle.value == "Fade In" ||doc.fadeStyle.value == "Fade InOut"){
				core.flags.fadeIn = true;
			}
			else{
				code.flage.fadeIn = false;
			}
			if(doc.fadeStyle.value == "Fade In" ||doc.fadeStyle.value == "Fade InOut"){
				code.flage.fadeOut = true;
			}
			else{
				code.flage.fadeOut = false;
			}
		}	
	};
}())