var lastToggled;

(function() {
	PNotify.prototype.options.styling = "bootstrap3";
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
			$("#adfgvx-square").val(GenRandKey("abcdefghijklmnopqrstuvwxyz0123456789"));
		}
		else if (this.name == "bifid-encrypt"){
			var input = getBifidValue();
			showResult("Encrypted Message: " + BifidEncrypt(input.message, input.square, input.period));
		}
		else if (this.name == "bifid-decrypt"){
			var input = getBifidValue();
			showResult("Decrypted Message: " + BifidDecrypt(input.message, input.square, input.period));
		}
		else if (this.name == "bifid-randomSquare"){
			$("#bifid-square").val(GenRandKey("abcdefghiklmnopqrstuvwxyz"));
		}
		else if (this.name == "caesar-encrypt"){
			var input = getCaesarValue();
		}
		else if (this.name == "caesar-decrypt"){
			var input = getCaesarValue();
		}
		else if (this.name == "hill-encrypt"){
			 var input = getHillValue();
             encrypt(input.message,input.matrix);
		}
		else if (this.name == "hill-decrypt"){
			var input = getHillValue();
            decrypt(input.message,input.matrix);
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

function getADFGVXValue(){
	var message = $("#adfgvx-message").val();
	var keyword = $("#adfgvx-key").val();
	var square = $("#adfgvx-square").val();
	return {message: message, keyword: keyword, square: square};
}

function getBifidValue(){
	var message = $("#bifid-message").val();
	var period = parseInt($("#bifid-period").val());
	var square = $("#bifid-square").val();
	return {message: message, period: period, square: square};
}

function getCaesarValue(){
	var message = $("#caesar-message").val();
	var shift = parseInt($("#caesar-shift").val());
	return {message: message, shift: shift};
}

function getHillValue(){
	var message = $("#hill-message").val().toUpperCase();
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

function showError(message){
	new PNotify({
		title: 'Oh No!',
		text: message,
		type: 'error'
	});
}