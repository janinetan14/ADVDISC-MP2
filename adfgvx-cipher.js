function ADFGVXEncrypt(text, keyword, keysquare) {
	DisplayKeySquare(keysquare);
    
	var plaintext, ciphertext, keysquare, keyword;
    plaintext = text.toLowerCase().replace(/[^a-z0-9]/g, "");  
    keysquare = keysquare.toLowerCase().replace(/[^a-z0-9]/g, ""); 
    keyword = keyword.toLowerCase().replace(/[^a-z]/g, ""); 
	
	// for error catching
    if(plaintext.length < 1){ 
		showError("please enter some plaintext (letters and numbers only)"); 
		return; 
	}    
    if(keysquare.length != 36){ 
		showError("keysquare must be 36 characters in length"); 
		return; 
	}
    if(keyword.length <= 1){ 
		showError("keyword should be at least 2 characters long"); 
		return; 
	}
	
    // first use polybius square to encipher plaintext
    adfgvx = "ADFGVX";    
	ciphertext1 = "";
    for(i = 0; i < plaintext.length; i++){
        index = keysquare.indexOf(plaintext.charAt(i));
        ciphertext1 += adfgvx.charAt(index/6) + adfgvx.charAt(index%6);
    }
	
    // if the length of the cipher text is wrong, append some 'x's
    var colLength = ciphertext1.length / keyword.length;
    var chars = "abcdefghijklmnopqrstuvwxyz"; 
    ciphertext = ""; 
	k=0;
    for(i=0; i < keyword.length; i++){
        while(k<26){
            t = keyword.indexOf(chars.charAt(k));
            arrkw = keyword.split(""); 
			arrkw[t] = "_"; 
			keyword = arrkw.join("");
            if(t >= 0) 
				break;
            else 
				k++;
        }
        for(j=0; j < colLength; j++) 
			ciphertext += ciphertext1.charAt(j*keyword.length + t);
    }
    return  ciphertext;
}

function ADFGVXDecrypt(ciphertext, keyword, keysquare) {
	//example keysquare: ai2o0d1bh6mstnwcq4lg7vyrf5e3xz9pjk8u
    ciphertext = ciphertext.toLowerCase().replace(/[^a-z0-9]/g, "");  
    keysquare = keysquare.toLowerCase().replace(/[^a-z0-9]/g, ""); 
    keyword = keyword.toLowerCase().replace(/[^a-z]/g, ""); 
    klen = keyword.length;
    var re = /[^adfgvx]/;

    // for error catching
    if(ciphertext.length < 1){ 
		showError("please enter some ciphertext (letters only)"); 
		return; 
	}
    if(re.test(ciphertext)){
		showError("ciphertext can only contain A,D,F,G,V or X characters."); 
		return;
	};
	if(ciphertext.length % 2 != 0){
		showError("number of ciphertext characters must be even"); 
		return; 
	}  
	
    if(keysquare.length != 36){ 
		showError("keysquare must be 36 characters in length"); 
		return; 
	}
    if(klen <= 1){ 
		showError("keyword should be at least 2 characters long");
		return; 
	}
	DisplayKeySquare(keysquare);
	
    var numLongCols = ciphertext.length % klen;
    var cols = new Array(klen);
    var colLength = Math.floor(ciphertext.length / klen);
	
    // now we rearrange the columns so that they are in their unscrambled state
    chars = "abcdefghijklmnopqrstuvwxyz";
	i = 0;
	upto = 0;
    for(j = 0;j < klen;){
        t = keyword.indexOf(chars.charAt(i));        
        if(t >= 0){
            if(t < numLongCols) 
				cl = colLength+1;
            else 
				cl = colLength;
            cols[t] = ciphertext.substr(upto,cl);
            upto = upto + cl;
            arrkw = keyword.split(""); 
			arrkw[t] = "_"; 
			keyword = arrkw.join("");
            j++;
        }else 
			i++;         
    }    
    // now read off the columns row-wise
    plaintext1 = "";
    for(j=0; j < colLength+1; j++){
		for(i=0; i < klen; i++){
			plaintext1 += cols[i].charAt(j);
		}
	}
	
    // now undo the polybius square
    adfgvx = "adfgvx"; 
	plaintext = "";
    for(i = 0; i < plaintext1.length; i += 2){
        keyindex = adfgvx.indexOf(plaintext1.charAt(i))*6 + adfgvx.indexOf(plaintext1.charAt(i+1));
        plaintext += keysquare.charAt(keyindex);
    }
    return plaintext;
}

function GenRandKey(keychars){
    var keychars = keychars;
    var chars = keychars.split("");
    ret = ""; 
	lim = chars.length
    for(i = 0; i < lim; i++){
        index = Math.floor(chars.length*Math.random());
        ret += chars[index];
        chars.splice(index,1);
    }
    return ret.toUpperCase();
}

function DisplayKeySquare(keysquare){
	var row = new Array();
	var square = "";
	row[0] = ".|ADFGVX";
	row[1] = "A|" + keysquare.substring(0,6);	
	row[2] = "D|" + keysquare.substring(6,12);
	row[3] = "F|" + keysquare.substring(12,18);
	row[4] = "G|" + keysquare.substring(18,24);
	row[5] = "V|" + keysquare.substring(24,30);
	row[6] = "X|" + keysquare.substring(30,36);
	
	for(i = 0; i < 7; i++){
		if (i == 0)
			square += "<span>" + row[i].split('').join(" ") + "</span><br>";
		else
			square += row[i].split('').join(" ") + "<br>";
	}
	
	showString(square);
}