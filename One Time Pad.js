function charEncrypt(str, amount) {
	// Wrap the amount
	if (amount < 0)
		return caesarShift(str, amount + 26);

	// Make an output variable
	var output = '';

	// Go through each character
	for (var i = 0; i < str.length; i ++) {

		// Get the character we'll be appending
		var c = str[i];

		// If it's a letter...
		if (c.match(/[a-z]/i)) {

			// Get its code
			var code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
		}

		// Append
		output += c;

	}

	// All done!
	return output;
}

function CaesarDecrypt(str, amount) {
	// Wrap the amount
	if (amount < 0)
		return caesarShift(str, amount + 26);

	// Make an output variable
	var output = '';

	// Go through each character
	for (var i = 0; i < str.length; i ++) {

		// Get the character we'll be appending
		var c = str[i];

		// If it's a letter...
		if (c.match(/[a-z]/i)) {

			// Get its code
			var code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 - amount) % 26) + 65);
		}

		// Append
		output += c;

	}

	// All done!
	return output;
}

function OneTimePadEncrypt(keychars){
    var keychars = keychars.toUpperCase();
    var chars = keychars.split("");
    var ret = ""; 
	var lim = chars.length;
    for(i = 0; i < lim; i++){
        index = Math.floor(chars.length*Math.random());
        ret += charEncrypt(chars[i],index);
    } 
    return ret;
}