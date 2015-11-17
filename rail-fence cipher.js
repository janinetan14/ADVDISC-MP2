function RailEncrypt(text, key) {
    plaintext = text.toUpperCase().replace(/[^A-Z]/g, "");  
    if(plaintext.length < 1){ 
		alert("please enter some plaintext"); 
		return; 
	}    
    var key = key;
    if(key > Math.floor(2*(plaintext.length-1))){ 
		alert("key is too large for the plaintext length."); 
		return; 
	}  
    if(key == 1) 
		ciphertext = plaintext;
    else{
      ciphertext = "";
      for(line = 0; line < key-1; line++){
    	  skip=2*(key-line-1);	  
		  j=0;
        for(i = line; i < plaintext.length;){
            ciphertext += plaintext.charAt(i);
       	    if((line == 0) || (j%2 == 0)) 
				i += skip;
        	else i += 2 * (key-1) - skip;  
				j++;          
        }
      }
      for(i = line; i < plaintext.length; i += 2 *(key-1)) 
		ciphertext += plaintext.charAt(i);
    }
    return ciphertext;
}

function RailDecrypt(text, key) {
	var plaintext = "";
    ciphertext = text.toUpperCase().replace(/[^A-Z]/g, "");  
    if(ciphertext.length < 1){ 
		alert("please enter some ciphertext (letters only)"); 
		return; 
	}    
    var key = key;
    if(key > Math.floor(2*(ciphertext.length-1))){ 
		alert("key is too large for the ciphertext length."); 
		return; 
	}      
    if(key==1) 
		plaintext = ciphertext;
    else{
      pt = new Array(ciphertext.length);   
	  k=0;
      for(line = 0; line < key - 1; line++){
    	  skip = 2 * (key-line-1);	 
		  j = 0;
        for(i = line; i < ciphertext.length;){
            pt[i] = ciphertext.charAt(k++);
       	    if((line==0) || (j%2 == 0)) 
				i+=skip;
        	else 
			  i+=2*(key-1) - skip;  
			j++;        
        }
      }
      for(i=line; i<ciphertext.length; i+=2*(key-1)) 
		pt[i] = ciphertext.charAt(k++);
      plaintext = pt.join("");
    }
	return plaintext;
}