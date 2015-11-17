function StraddleCheckerboardEncrypt(text, key, num1, num2) {
    plaintext = text.toUpperCase().replace(/[^A-Z]/g, "");
	
    key = key.toUpperCase().replace(/[^A-Z]/g, "");
	
	
    if(plaintext.length < 1){ 
		alert("please enter some plaintext (letters only)"); 
		return; 
	}    
	
    if(key.length != 26){ 
		alert("keysquare must be 26 characters in length"); 
		return; 
	}	
	DisplayStraddlingCheckboard(key, num1, num2);
    ciphertext=""; 
	//num[1] = num[1]-1;
    for(i = 0; i < plaintext.length; i++){
    	ind = key.indexOf(plaintext.charAt(i));
    	if(ind < num1) { 
			ciphertext += ind; 
		}
    	else if((ind >= num1) && (ind < num2-1)) { 
			ciphertext += (ind+1); 
		}
		else if((ind >= num2-1) && (ind < 8)) { 
			ciphertext += (ind+2); 
		} 	
    	else if(ind < 18) { 
			ciphertext += num1 + "" + (ind-8); 
		}
    	else {
			ciphertext += num2 +""+ (ind-18); 
		}
    }
    return ciphertext;
}

function StraddleCheckerboardDecrypt(text, key, num1, num2) {
    ciphertext = text.toUpperCase().replace(/[^0-9]/g, "");  
	
    key = key.toUpperCase().replace(/[^A-Z]/g, ""); 
	
    if(ciphertext.length < 1){ 
		alert("please enter some ciphertext (letters only)"); 
		return; 
	}    
	
    if(key.length != 26){ 
		alert("keysquare must be 26 characters in length"); 
		return; 
	}
	//DisplayStraddlingCheckboard(key, num1, num2);
    plaintext="";
    for(i = 0; i < ciphertext.length; i++){
        if(parseInt(ciphertext.charAt(i)) == num1){
                if (ciphertext.length == i+1){
                    alert("invalid final ciphertext character: " + num1);
                    plaintext += "?";
                }else{
                    plaintext += key.charAt( parseInt(ciphertext.charAt(++i)) +8);
                }
    	}else if(parseInt(ciphertext.charAt(i)) == num2){
                if (ciphertext.length == i+1){
                    alert("invalid final ciphertext character: " + num2);
                    plaintext += "?";
                }else{
					temp = parseInt(ciphertext.charAt(++i)) + 18;
					if (temp > 25){ 
					   alert("invalid ciphertext sequence: "+num2 + ciphertext.charAt(i));
					   plaintext += "?";
                }else{
					plaintext += key.charAt( temp);
                }}
    	}else{
    	  n = parseInt(ciphertext.charAt(i));
    	  if(n < num1) 
			plaintext += key.charAt(n);
    	  else if(n < num2) 
			plaintext += key.charAt(n-1);
    	  else 
			plaintext += key.charAt(n-2);
      }
    }
    return plaintext;
}

function DisplayStraddlingCheckboard(key, num1, num2){
	var row = new Array();
	if(num1 > num2){
		temp1 = num2;
		temp2 = num1;
	}
	else{
		temp1 = num1;
		temp2 = num2;
	}
	var square = "";
	row[0] = ".|0123456789";
	row[1] = " " + key.substring(0,temp1) + " " + key.substring(temp1,temp2) + " " + key.substring(temp2,8);	
	row[2] = num1 + ":" + key.substring(8,18);
	row[3] = num2 + ":" + key.substring(18,26);	
	for(i = 0; i < 4; i++){
		if (i == 0)
			square += "<span>" + row[i].split('').join(" ") + "</span><br>";
		else 
			square += row[i].split('').join(" ") + "<br>";
	}
	
	showString(square);
}