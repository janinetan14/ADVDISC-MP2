var lastToggled;

(function() {
	PNotify.prototype.options.styling = "bootstrap3";
	$(".option .body").hide();
	
	$(".option .header").click(function(){
		$(".form-group").removeClass("has-error");
		var toggledNow = $($(this).parent()).children(".body");
		if (!(toggledNow.is(lastToggled))){
			$(".option input, .option textarea").val("");
			$("#hill-matSize").val("2");
			$("#hill-matSize").keyup();
			$(".hill-matrix input").val("0");
			if (typeof lastToggled != "undefined")
				lastToggled.slideToggle();
			lastToggled = toggledNow;
			lastToggled.slideToggle();
		}
	});
	
	$("#hill-matSize").bind('keyup mouseup', function () {
		if(this.value == 2)
			$(".3").hide();
		else
			$(".3").show();
	});
	
	$(".btn").click(function(event){
		event.preventDefault();
		// for randomized inputs
		if (this.name == "adfgvx-randomSquare"){
			$("#adfgvx-square").val(GenRandKey("abcdefghijklmnopqrstuvwxyz0123456789"));
		}		
		else if (this.name == "bifid-randomSquare"){
			$("#bifid-square").val(GenRandKey("abcdefghiklmnopqrstuvwxyz"));
		}
		else if (this.name == "straddle-randomKey"){
			$("#straddle-key").val(GenRandKey("abcdefghijklmnopqrstuvwxyz"));
		}
		else {
			if (validateForm(this.closest('form'))){
				clearResultsPanel();
				if(this.name == "adfgvx-encrypt"){
					var input = getADFGVXValue();
					showResult("Encrypted Message: " + ADFGVXEncrypt(input.message, input.keyword, input.square));
				}
				else if (this.name == "adfgvx-decrypt"){
					var input = getADFGVXValue();
					showResult("Decrypted Message: " + ADFGVXDecrypt(input.message, input.keyword, input.square));
				}
				else if (this.name == "bifid-encrypt"){
					var input = getBifidValue();
					showResult("Encrypted Message: " + BifidEncrypt(input.message, input.square, input.period));
				}
				else if (this.name == "bifid-decrypt"){
					var input = getBifidValue();
					showResult("Decrypted Message: " + BifidDecrypt(input.message, input.square, input.period));
				}
				else if (this.name == "caesar-encrypt"){
					var input = getCaesarValue();
					showResult("Encrypted Message: " + CaesarEncrypt(input.message, input.shift));
				}
				else if (this.name == "caesar-decrypt"){
					var input = getCaesarValue();
					showResult("Decrypted Message: " + CaesarDecrypt(input.message, input.shift));
				}
				else if (this.name == "hill-encrypt"){
					var input = getHillValue();
					HillEncrypt(input.message,input.matrix);
				}
				else if (this.name == "hill-decrypt"){
					var input = getHillValue();
					HillDecrypt(input.message,input.matrix);
				}
				else if (this.name == "playfair-encrypt"){
					var input = getPlayfailValue();
					showResult("Encrypted Message: " + DoPlayfair(input.message, input.keyword, "E"));
				}
				else if (this.name == "playfair-decrypt"){
					var input = getPlayfailValue();
					showResult("Decrypted Message: " + DoPlayfair(input.message, input.keyword, "D"));
				}
				else if (this.name == "rail-encrypt"){
					var input = getRailValue();
					showResult("Encrypted Message: " + RailEncrypt(input.message, input.key));
				}
				else if (this.name == "rail-decrypt"){
					var input = getRailValue();
					showResult("Decrypted Message: " + RailDecrypt(input.message, input.key));
				}
				else if (this.name == "straddle-encrypt"){
					var input = getStraddleValue();
					showResult("Encrypted Message: " + StraddleCheckerboardEncrypt(input.message, input.key, input.num1, input.num2));
				}
				else if (this.name == "straddle-decrypt"){
					var input = getStraddleValue();
					showResult("Decrypted Message: " + StraddleCheckerboardDecrypt(input.message, input.key, input.num1, input.num2));
				}
			}
		}
	});
})();

function validateForm(parent){
    var result = true;
    $(parent).validator('validate');
    $(parent).find('.form-group').each(function(){
        if($(this).hasClass('has-error')){
            result = false;
            return false;
        }
    });
    return result;
}

function getADFGVXValue(){
	var message = $("#adfgvx-message").val();
	var keyword = $("#adfgvx-key").val();
	if ($("#adfgvx-square").val() == "")
		$("#adfgvx-square").val(GenRandKey("abcdefghijklmnopqrstuvwxyz0123456789"));
	var square = $("#adfgvx-square").val();
	return {message: message, keyword: keyword, square: square};
}

function getBifidValue(){
	var message = $("#bifid-message").val();
	var period = parseInt($("#bifid-period").val());
	if ($("#bifid-square").val() == "")
		$("#bifid-square").val(GenRandKey("abcdefghiklmnopqrstuvwxyz"));
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
	var n = parseInt($("#hill-matSize").val());
	var matrix = [];
	for ( var i = 0; i < n; i++ ){
		matrix[i] = [];
	}
	var x = 0, y = 0;
	$('.hill-matrix input:visible').each(function() {
		matrix[y][x] = $(this).val() ;
		if ( x == n - 1 ){
			x = 0; y++;
		}
		else
			x++;
	})
	return {message: message, matrix: matrix};
}

function getPlayfailValue(){
	var message = $("#playfair-message").val();
	var keyword = $("#playfair-key").val();
	return {message: message, keyword: keyword};
}

function getRailValue(){
	var message = $("#rail-message").val();
	var key = $("#rail-key").val();
	return {message: message, key: key};
}

function getStraddleValue(){
	var message = $("#straddle-message").val();
	if ($("#straddle-key").val() == "")
		$("#straddle-key").val(GenRandKey("abcdefghijklmnopqrstuvwxyz"));
	var key = $("#straddle-key").val();
	var num1 = parseInt($("#straddle-num1").val());
	var num2 = parseInt($("#straddle-num2").val());
	return {message: message, key: key, num1: num1, num2: num2};
}

function showError(message){
	new PNotify({
		title: 'Oh No!',
		text: message,
		type: 'error'
	});
}