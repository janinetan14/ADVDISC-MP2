function translateToMatrixNumbers(message, size){
	var matrix = [];
	// initialize arrays
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
					matrix[j][i] = 23;
			}
			else{
				matrix[j][i] = 23;
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
			matrix[j][i] = (Math.abs(matrix[j][i])%26) + 65;
			message += String.fromCharCode(matrix[j][i]);
		}
	}
	return message;
}

function getDeteminantOf2x2(matrix){
	var det = matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
	while (det < 0)
		det+=26;
	return det%26;
}

function getAdjugateOf2x2(matrix){
	return adj = [[matrix[1][1], -1*matrix[0][1]], [-1*matrix[1][0], matrix[0][0]] ];
}

function getMultiplicativeInverse(det){
	var ctr = 1;
	var inverse = det;
	while (inverse%26 != 1){
		ctr++;
		inverse = det*ctr;
	}
	return ctr;
}

function multiplyByDeterminant(matrix, mi){
	var rows = matrix.length;
	var cols = matrix[0].length;
	
	for (var i = 0; i < rows; i++){
		for (var j =0; j < cols; j++){
			matrix[i][j] *= mi;
			while (matrix[i][j] < 0)
				matrix[i][j]+=26;
			matrix[i][j]%=26;
		}
	}
	return matrix;
}