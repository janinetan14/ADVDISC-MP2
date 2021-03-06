var pCtr = 0;

// matrix sample [[1,2,3],[3,4,5],[5,6,7]]
function addMatrixDisplayer(matrix){
	$("#results-panel").append('<p class="results" id="Matrix'+pCtr+'" style="text-align:center"></p>');
	printMatrix(matrix, "Matrix"+pCtr);
}

function printMatrix(matrix, formulaLabel){
	var rows = matrix.length;
	var cols = matrix[0].length;
	
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

function showResult(result){
	$("#results-panel").append('<div class="results title resultString">'+result+'</div>');
}

function showString(s){
	$("#results-panel").append('<div class="results title text-container">'+s+'</div>');
}

function clearResultsPanel(){
	$(".results").remove();
	pCtr = 0;
}