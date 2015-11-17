function createEncryptArray()
{
    var iMax = 4;
    var jMax = 4;
    var e = new Array();

    for (i=0;i<iMax;i++) 
    {
     e[i]=new Array();
        for (j=0;j<jMax;j++) 
        {
            e[i][j]=i;
        }
    }
    return e;
}

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

function hillEncryption()
{
    var iMax = 4;
    var jMax = 4;
    var f = new Array();

    for (i=0;i<iMax;i++) 
    {
     f[i]=new Array();
        for (j=0;j<jMax;j++) 
        {
            f[i][j]=i;
        }
    }
    e = createEncryptArray();
	return multiply(e,f);
}

function display(m) {
  for (var r = 0; r < m.length; ++r) {
    alert('&nbsp;&nbsp;'+m[r].join(' ')+'<br />');
  }
}

alert('matrix a:<br />');
display(createEncryptArray());
alert('a * b =<br />');
display(hillEncryption());