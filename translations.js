function translateToMatrixNumbers(message, size){
	var matrix = [];
	
	for (var i = 0; i < size; i++){
		matrix[i] = [];
	}
	
	var k = 0;
	for (var i = 0; i < message.length/size; i++){
		for (var j = 0; j < size; j++){
			if (k < message.length){
				if (message.charAt(k) != ' ')
					matrix[j][i] = message.charCodeAt(k) - 65;
				else
					matrix[j][i] = 26;
			}
			else{
				matrix[j][i] = 26;
			}
			k++;
		}
	}
	return matrix;
}

function translateMatrixToMessage(matrix){
	var rows = matrix.length;
	var cols = matrix[0].length;
	var message = "";
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			if (matrix[j][i] == 26){
				message += ' ';
			}
			else{
				matrix[j][i] = (Math.abs(matrix[j][i])%26) + 65;
				message += String.fromCharCode(matrix[j][i]);
			}
		}
	}
	return message;
}