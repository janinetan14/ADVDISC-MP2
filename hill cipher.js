function multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

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

function getUncomputedDetOf2x2(matrix){
	return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
}

function getDeteminantOf3x3(matrix){
	var a = matrix[0][0];
	var b = matrix[0][1];
	var c = matrix[0][2];
	var d = matrix[1][0];
	var e = matrix[1][1];
	var f = matrix[1][2];
	var g = matrix[2][0];
	var h = matrix[2][1];
	var i = matrix[2][2];
	
	var det = a*e*i - a*f*h - b*d*i + b*f*g + c*d*h - c*e*g;
	while (det < 0)
		det+=26;
	return det%26;
}

function getAdjugateOf2x2(matrix){
	return adj = [[matrix[1][1], -1*matrix[0][1]], [-1*matrix[1][0], matrix[0][0]] ];
}

function getAdjugateOf3x3(matrix){
	var a = matrix[0][0];
	var b = matrix[0][1];
	var c = matrix[0][2];
	var d = matrix[1][0];
	var e = matrix[1][1];
	var f = matrix[1][2];
	var g = matrix[2][0];
	var h = matrix[2][1];
	var i = matrix[2][2];
	
	var aa = getUncomputedDetOf2x2([[e,f], [h,i]]);
	var bb = -1*getUncomputedDetOf2x2([[b,c], [h,i]]);
	var cc = getUncomputedDetOf2x2([[b,c], [e,f]]);
	var dd = -1*getUncomputedDetOf2x2([[d,f], [g,i]]);
	var ee = getUncomputedDetOf2x2([[a,c], [g,i]]);
	var ff = -1*getUncomputedDetOf2x2([[a,c], [d,f]]);
	var gg = getUncomputedDetOf2x2([[d,e], [g,h]]);
	var hh = -1*getUncomputedDetOf2x2([[a,b], [g,h]]);
	var ii = getUncomputedDetOf2x2([[a,b], [d,e]]);
	return adj = [[aa,bb,cc],[dd,ee,ff],[gg,hh,ii]]
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

function HillEncrypt(message, matrix){
	var det = 0;
	if (matrix.length == 2){
		det = getDeteminantOf2x2(matrix);
	}
	else if (matrix.length == 3){
		det = getDeteminantOf3x3(matrix);
	}
	if ( det != 0 ){
		var numMatrix = translateToMatrixNumbers(message, matrix.length);
		addMatrixDisplayer(numMatrix);
		var multipliedMatrix = multiply(matrix,numMatrix);
		addMatrixDisplayer(multipliedMatrix);
		var encrypted = translateMatrixToMessage(multipliedMatrix);
		showResult("Encrypted Message: " + encrypted);
	}
	else {
		showError("Please enter a different encryption matrix.");
	}
}
    
function HillDecrypt(message,matrix) {
	var det = 0;
	var adjMatrix;
	if (matrix.length == 2){
		det = getDeteminantOf2x2(matrix);
		adjMatrix = getAdjugateOf2x2(matrix);
	}
	else if (matrix.length == 3){
		det = getDeteminantOf3x3(matrix);
		adjMatrix = getAdjugateOf3x3(matrix);
	}
	if (det != 0){
		showString("Determinant: " + det);
		showString("Adjugate Matrix");
		addMatrixDisplayer(adjMatrix);
		
		var mi = getMultiplicativeInverse(det);
		showString("Multiplicative Inverse: " + mi);
		
		var keyMatrix = multiplyByDeterminant(adjMatrix,mi);
		showString("Inverse Key Matrix: ");
		addMatrixDisplayer(keyMatrix);
		
		var numMatrix = translateToMatrixNumbers(message, matrix.length);
		addMatrixDisplayer(numMatrix);
		
		var multipliedMatrix = multiply(keyMatrix, numMatrix);
		addMatrixDisplayer(multipliedMatrix);
		
		var decrypted = translateMatrixToMessage(multipliedMatrix);
		showResult("Encrypted Message: " + decrypted);
	}
	else{
		showError("Please enter a different encryption matrix.");
	}
}
