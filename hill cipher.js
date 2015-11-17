var en = new Array();
function invertMatrix(M){
    // I use Guassian Elimination to calculate the inverse:
    // (1) 'augment' the matrix (left) by the identity (on the right)
    // (2) Turn the matrix on the left into the identity by elemetry row ops
    // (3) The matrix on the right is the inverse (was the identity matrix)
    // There are 3 elemtary row ops: (I combine b and c in my code)
    // (a) Swap 2 rows
    // (b) Multiply a row by a scalar
    // (c) Add 2 rows
    
    //if the matrix isn't square: exit (error)
    if(M.length !== M[0].length){return;}
    
    //create the identity matrix (I), and a copy (C) of the original
    var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
    var I = [], C = [];
    for(i=0; i<dim; i+=1){
        // Create the row
        I[I.length]=[];
        C[C.length]=[];
        for(j=0; j<dim; j+=1){
            
            //if we're on the diagonal, put a 1 (for identity)
            if(i==j){ I[i][j] = 1; }
            else{ I[i][j] = 0; }
            
            // Also, make the copy of the original
            C[i][j] = M[i][j];
        }
    }
    
    // Perform elementary row operations
    for(i=0; i<dim; i+=1){
        // get the element e on the diagonal
        e = C[i][i];
        
        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if(e==0){
            //look through every row below the i'th row
            for(ii=i+1; ii<dim; ii+=1){
                //if the ii'th row has a non-0 in the i'th col
                if(C[ii][i] != 0){
                    //it would make the diagonal have a non-0 so swap it
                    for(j=0; j<dim; j++){
                        e = C[i][j];       //temp store i'th row
                        C[i][j] = C[ii][j];//replace i'th row by ii'th
                        C[ii][j] = e;      //repace ii'th by temp
                        e = I[i][j];       //temp store i'th row
                        I[i][j] = I[ii][j];//replace i'th row by ii'th
                        I[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if(e==0){return}
        }
        
        // Scale this row down by e (so we have a 1 on the diagonal)
        for(j=0; j<dim; j++){
            C[i][j] = C[i][j]/e; //apply to original matrix
            I[i][j] = I[i][j]/e; //apply to identity
        }
        
        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for(ii=0; ii<dim; ii++){
            // Only apply to other rows (we want a 1 on the diagonal)
            if(ii==i){continue;}
            
            // We want to change this element to 0
            e = C[ii][i];
            
            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for(j=0; j<dim; j++){
                C[ii][j] -= e*C[i][j]; //apply to original matrix
                I[ii][j] -= e*I[i][j]; //apply to identity
            }
        }
    }
    
    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    return I;
}
function translateToNumber(str,em)
{
    var i, aSize=str.length, m = [], iMax = em.length, k = 0, a = [];
    for(i=0;i<aSize;i++)
    {
        m[i]=str.charCodeAt(i);
    }
    var jMax = Math.ceil(m.length/iMax);
    for (i=0;i<iMax;i++) 
    {
        a[i]=[];
    }
    
    for (i=0;i<jMax;i++) 
    {
        for (j=0;j<iMax;j++) 
        {
            if(k<m.length)
            {
                if(m[k]!=32)
                    a[j][i]=m[k]-64;
                else
                    a[j][i]=27;
                k++;
            }
            else
                a[j][i]=27;
        }
    }
    return a;
}

function translateToWord(a)
{
    var iMax =a.length, jMax = a[0].length,k=0,m=[];
    
    for (i=0;i<jMax;i++) 
    {
        for (j=0;j<iMax;j++) 
        {
            if(k<iMax*jMax)
            {
                if(a[j][i]!=27)
                {
                    m[k]=String.fromCharCode(a[j][i]+64);
                }
                else
                    m[k]=String.fromCharCode(32);
                k++;
            }
            else
                m[k]= String.fromCharCode(32);
        }
    }
    return m;
}
function translateFromAscii(a)
{
    var iMax =a.length, jMax = a[0].length,k=0,m=[];
    
    for (i=0;i<jMax;i++) 
    {
        for (j=0;j<iMax;j++) 
        {
            if(k<iMax*jMax)
            {
                m[k]=String.fromCharCode(a[j][i]);
                k++;
            }
        }
    }
    return m;
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

function hillDecryption(mesMatrix, invMatrix)
{
    
    if (typeof invMatrix != "undefined") 
        return multiply(invMatrix,mesMatrix);
    else
    {
        console.log('Matrix used to encrypt has no inverse thus cannot be decrypted');
        return false;
    }
}

function HillEncrypt(message, matrix)
{
    showString('Message:'+ message);
    showString('Encryption Matrix');
    addMatrixDisplayer(matrix);
    showString('Message Matrix');
    var mesMatrix = translateToNumber(message,matrix);
    addMatrixDisplayer(mesMatrix);
    
    showString('Encrypted Matrix');
    var encryptedMatrix =multiply(matrix,mesMatrix);
    addMatrixDisplayer(encryptedMatrix);
    
    showString('Encrypted Text');
    var encMes = translateFromAscii(encryptedMatrix);
    var i,outp='';
    for(i=0;i<encMes.length;i++)
        outp+=encMes[i]+'';
    showString(outp);
}
    
function HillDecrypt(message,matrix)
{
    showString('Message:'+ message);
    showString('Message Matrix');
    var mesMatrix = translateToNumber(message,matrix);
    addMatrixDisplayer(mesMatrix);
    
    showString('Inverted Matrix');
    var invMatrix = invertMatrix(matrix); 
    addMatrixDisplayer(invMatrix);
    
    showString('Decrypted Matrix');
    var decryptedMatrix = (hillDecryption(mesMatrix,invMatrix));
    addMatrixDisplayer(decryptedMatrix);
    
    var decMes = translateToWord(decryptedMatrix);
    showString('Decrypted Text');
    showString(decMes);
}
