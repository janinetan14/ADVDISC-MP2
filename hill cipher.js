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

function HillEncrypt(message, matrix){
	var numMatrix = translateToMatrixNumbers(message, matrix.length);
	addMatrixDisplayer(numMatrix);
	var multipliedMatrix = multiply(matrix,numMatrix);
	addMatrixDisplayer(multipliedMatrix);
	var encrypted = translateMatrixToMessage(multipliedMatrix);
	showResult("Encrypted Message: " + encrypted);
}
    
function HillDecrypt(message,matrix) {
	var det = 0;
	var adjMatrix;
	if (matrix.length == 2){
		det = getDeteminantOf2x2(matrix);
		adjMatrix = getAdjugateOf2x2(matrix);
	}
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
