var pCtr = 0;

function addMatrixDisplayer(){
	$("#results-panel").append('<p class="results" id="Matrix'+pCtr+'" style="text-align:center"></p>');
	printMatrix([[1,2,3],[3,4,5],[5,6,7]], "Matrix"+pCtr);
}

function printMatrix(matrix, formulaLabel){
	var rows = matrix.length;
	var cols = matrix[0].length;
	console.log(rows + " " + cols);
	var math = document.getElementById(formulaLabel);
	var matrixContent = '$$\\begin{bmatrix}';
	for (var i = 0; i < rows; i++){
		for (var j = 0; j < cols; j++){
			if (j == 0){
				matrixContent += Math.round(matrix[i][j] * 100) / 100;
			}
			else{
				matrixContent += " & " + Math.round(matrix[i][j] * 100) / 100;
			}
		}
		matrixContent += '\\\\';
	}
	matrixContent += '\\end{bmatrix}$$'
	math.innerHTML = matrixContent ;
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,formulaLabel]);
	pCtr++;
}

function showString(s){
	$("#results-panel").append('<div class="results title resultString">'+s+'</div>');
}

function clearResultsPanel(){
	$(".results").remove();
	pCtr = 0;
}