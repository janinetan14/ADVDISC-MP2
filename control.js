var lastToggled;

(function() {
	$(".option .body").hide();
	
	$(".option .header").click(function(){
		var toggledNow = $($(this).parent()).children(".body");
		if (!(toggledNow.is(lastToggled))){
			$(".option input, .option textarea").val("");
			if (typeof lastToggled != "undefined")
				lastToggled.slideToggle();
			lastToggled = toggledNow;
			lastToggled.slideToggle();
		}
	});
	
	$(".btn").click(function(){
		if(this.name == "adfgvx-encrypt"){
			var input = getADFGVXValue();
			
		}
		else if (this.name == "adfgvx-decrypt"){
			var input = getADFGVXValue();
			
		}
		else if (this.name == "hill-encrypt"){
			getHillValue();
		}
		else if (this.name == "hill-decrypt"){
		}
		else if (this.name == "playfair-encrypt"){
		}
		else if (this.name == "playfair-decrypt"){
		}
		
	});
})();

function getHillValue(){
	console.log($("textarea").val());
	//console.log({matrix: matrix});
}

function getPlayfailValue(){
}

function getADFGVXValue(){
	var message = $("#adfgvx-message").val();
	var keyword = $("#adfgvx-key").val();
	return {message: message, keyword: keyword};
}