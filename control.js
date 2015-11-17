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
		clearResultsPanel();
		if(this.name == "adfgvx-encrypt"){
			var input = getADFGVXValue();
			showResult("Encrypted Message: " + ADFGVXEncrypt(input.message, input.keyword, input.square));
		}
		else if (this.name == "adfgvx-decrypt"){
			var input = getADFGVXValue();
			showResult("Decrypted Message: " + ADFGVXDecrypt(input.message, input.keyword, input.square));
		}
		else if (this.name == "adfgvx-randomSquare"){
			$("#adfgvx-square").val(GenRandKey());
		}
		else if (this.name == "hill-encrypt"){
			getHillValue();
		}
		else if (this.name == "hill-decrypt"){
			getHillValue();
		}
		else if (this.name == "playfair-encrypt"){
			var input = getPlayfailValue();
			showResult("Encrypted Message: " + DoPlayfair(input.message, input.keyword, "E"));
		}
		else if (this.name == "playfair-decrypt"){
			var input = getPlayfailValue();
			showResult("Decrypted Message: " + DoPlayfair(input.message, input.keyword, "D"));
		}
		
	});
})();

function getHillValue(){
	var message = $("#hill-message").val().split('');
	var tempMatrix = $("#hill-matrix").val().split("\n");
	var matrix = [];
	for (var i = 0; i < tempMatrix.length; i++)
		matrix[i] = tempMatrix[i].split(/ *, */);
	return {message: message, matrix: matrix};
}

function getPlayfailValue(){
	var message = $("#playfair-message").val();
	var keyword = $("#playfair-key").val();
	return {message: message, keyword: keyword};
}

function getADFGVXValue(){
	var message = $("#adfgvx-message").val();
	var keyword = $("#adfgvx-key").val();
	var square = $("#adfgvx-square").val();
	return {message: message, keyword: keyword, square: square};
}