function printMatrix(points, formulaLabel){
	var math = document.getElementById(formulaLabel);
	var matrixContent = '$$\\begin{bmatrix}';
	for (var i = 0; i < points.length; i++){
		matrixContent += Math.round(points[i].x * 100) / 100 + " & " + Math.round(points[i].y * 100) / 100 + '\\\\';
	}
	matrixContent += '\\end{bmatrix}$$'
	math.innerHTML = matrixContent ;
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,formulaLabel]);
}