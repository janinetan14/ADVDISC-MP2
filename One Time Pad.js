var numKey=[];
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

			// Lowercase letters
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

		}

		// Append
		output += c;

	}

	// All done!
	return output;
}

function charDecrypt(str, amount) {
	// Wrap the amount
	if (amount < 0)
		return caesarShift(str, amount + 26);

	// Make an output variable
	var output = '';
    var a='';

	// Go through each character
	for (var i = 0; i < str.length; i ++) {

		// Get the character we'll be appending
		var c = str[i];
        var a;

		// If it's a letter...
		if (c.match(/[a-z]/i)) {

			// Get its code
			var code = str.charCodeAt(i);

			// Uppercase letters
			if ((code >= 65) && (code <= 90)){
                a = (code - 65 - amount);
                while(a<0)
                    a+=26;
				c = String.fromCharCode((a % 26) + 65);
            }

			// Lowercase letters
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 - amount) % 26) + 97);

		}

		// Append
		output += c;

	}

	// All done!
	return output;
}

function OTPGenRandKey(keychars){
    var keychars = keychars;
    var chars = keychars.split("");
    var letterKey = ""; 
	var lim = chars.length;
    var i;
    for(i = 0; i < lim; i++){
        index = Math.floor(25*Math.random());
        numKey[i]=index;
        letterKey += String.fromCharCode(index+65);
    } 
    return letterKey;
}
function OTPEncrypt(keychars){
    var keychars = keychars;
    var chars = keychars.split("");
    var lim = chars.length;
    var i,ret='';
    for(i=0; i < lim; i++){
        ret += charEncrypt(chars[i],numKey[i]);
    }
    return ret;
}
function OTPDecrypt(keychars){
    var keychars = keychars;
    var chars = keychars.split("");
    var lim = chars.length;
    var i,ret='';
    for(i=0; i < lim; i++){
        ret += charDecrypt(chars[i],numKey[i]);
    }
    return ret;
}