function BifidEncrypt(text, keysquare, period) {
    plaintext = text.toUpperCase().replace(/[^A-Z]/g, "").replace(/[J]/g, "I");  
    keysquare = keysquare.toUpperCase().replace(/[^A-Z]/g, ""); 
	
    // do some error checking
    if(plaintext.length < 1){ 
		alert("please enter some plaintext (letters only)"); 
		return; 
	}  
	
    if(keysquare.length != 25){ 
		alert("keysquare must be 25 characters in length"); 
		return; 
	}
	
    if(keysquare.indexOf("j") >= 0){ 
		alert("key should not contain letter j (combine with i)."); 
		return; 
	}
	
    period = period.replace(/[^0-9]/g,""));
	
    //period = plaintext.length;
    if(isNaN(period)){
		alert("period should be an integer"); 
		return; 
	};
	
    if(period <= 0){
		alert("period should greater than 0"); 
		return; 
	};
	
	BifidDisplayKeySquare(keysquare);
	
	//find row and column
    ind = "12345";    
	ct1 = ""; 
	ct2 = "";
    for(i = 0; i < plaintext.length; i++){
        index = keysquare.indexOf(plaintext.charAt(i));
        ct1 += ind.charAt(index/5); //row
        ct2 += ind.charAt(index%5); //column
    }
	
	//concat row and column
    i = 0; 
	ct3 = "";
    bit = ct1.substr(i,period);
    while(bit.length > 0){
        ct3 += bit + ct2.substr(i,period);
        i += period;
        bit = ct1.substr(i,period);
    }
	
	//get equivalent letter
    ciphertext = "";
    for(i = 0; i < ct3.length; i += 2){ 
		ciphertext += keysquare.charAt((parseInt(ct3.charAt(i))-1)*5 + parseInt(ct3.charAt(i+1)-1));
	}
    return ciphertext;
}

function BifidDecrypt(text, keysquare, period) {
    ciphertext = text.toUpperCase().replace(/[^A-Z]/g, "").replace(/[J]/g, "I");  
    keysquare = keysquare.toUpperCase().replace(/[^A-Z]/g, ""); 
	
    // do some error checking
    if(ciphertext.length < 1){ 
		alert("please enter some ciphertext (letters only)"); 
		return; 
	}    
    if(keysquare.length != 25){ 
		alert("keysquare must be 25 characters in length"); 
		return; 
	}
    if(keysquare.indexOf("j") >= 0){
		alert("key should not contain letter j (combine with i)."); 
		return; 
	}
	
    period = period.replace(/[^0-9]/g,""));
	
    //period = ciphertext.length;
    if(isNaN(period)){
		alert("period should be an integer"); 
		return; 
	}  ;
    if(period<=0){
		alert("period should greater than 0"); 
		return; 
	}  ;
	
    ind = "12345";   
	pt1 = "";
    for(i = 0; i < ciphertext.length; i++){
        index = keysquare.indexOf(ciphertext.charAt(i));
        pt1 += ind.charAt(index/5) + ind.charAt(index%5);
    }
    i = 0; 
	pt2 = ""; 
	pt3 = "";
    while(pt1.length - i >= 2 * period){
        pt2 += pt1.substr(i,period);
        pt3 += pt1.substr(i + period,period);
        i += 2 * period;
    }
    k = (pt1.length - i)/2;
    if(k >= 1){
		pt2 += pt1.substr(i,k); 
		pt3 += pt1.substr(i+k,k);
	}
    plaintext = "";
    for(i = 0; i < pt2.length; i++){ 
		plaintext += keysquare.charAt((parseInt(pt2.charAt(i))-1)*5 + parseInt(pt3.charAt(i)-1));
	}
    return plaintext;
}

function BifidDisplayKeySquare(keysquare){
var row = new Array();
	var square = "";
	row[0] = ".12345";
	row[1] = "1|" + keysquare.substring(0,5);	
	row[2] = "2|" + keysquare.substring(5,10);
	row[3] = "3|" + keysquare.substring(10,15);
	row[4] = "4|" + keysquare.substring(15,20);
	row[5] = "5|" + keysquare.substring(20,25);
	
	for(i = 0; i < 6; i++){
		if (i == 0)
			square += "<span>" + row[i].split('').join(" ") + "</span><br>";
		else
			square += row[i].split('').join(" ") + "<br>";
	}
	
	showString(square);
}