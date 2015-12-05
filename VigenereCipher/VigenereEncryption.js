var arrMsg;
var arrKeyword;
var arrCipher;
var arrDecrypted;
var msg = "";


//Makes an array that contains each character in the message
function msgSplitString()
{
	msg = document.getElementById("msg").value; //get message
	msg = (msg+"").split(' ').join('');
	//alert(msg);
	
	arrMsg = [];
	//arrMsg = new Array(msg.length()); //make array, size = length of message
	for (var i = 0; i < msg.length; i++)
	{
		arrMsg.push(msg.charAt(i));
	}
}

//Makes an array that contains the characters of the keyword that fits based on the message
function iniKeyword()
{
	var keyword = document.getElementById("keyword").value; // get keyword
	var msg = document.getElementById("msg").value; //get message
	console.log("Keyword is: " + keyword);
	
	arrKeyword = [];
	var i = 0, j = 0;
	while(i < arrMsg.length)
	{
		arrKeyword.push((keyword+"").charAt(j));
		j++;
		if(j >= keyword.length)		
			j = 0; //reset if reached end of keyword
		
		i++;
	}
	
}



function getNumericalValue(chr)
{
	//alert("chr is: " + chr);
	if(chr == "a" || chr == "A")
		return 0;
	else if(chr == "b" || chr == "B")
		return 1;
	else if(chr == "c" || chr == "C")
		return 2;
	else if(chr == "d" || chr == "D")
		return 3;
	else if(chr == "e" || chr == "E")
		return 4;
	else if(chr == "f" || chr == "F")
		return 5;
	else if(chr == "g" || chr == "G")
		return 6;		
	else if(chr == "h" || chr == "H")
		return 7;
	else if(chr == "i" || chr == "I")
		return 8;
	else if(chr == "j" || chr == "J")
		return 9;
	else if(chr == "k" || chr == "K")
		return 10;
	else if(chr == "l" || chr == "L")
		return 11;
    else if(chr == "m" || chr == "M")
		return 12;
	else if(chr == "n" || chr == "N")
		return 13;
	else if(chr == "o" || chr == "O")
		return 14;
	else if(chr == "p" || chr == "P")
		return 15;
	else if(chr == "q" || chr == "Q")
		return 16;
	else if(chr == "r" || chr == "R")
		return 17;
	else if(chr == "s" || chr == "S")
		return 18;
	else if(chr == "t" || chr == "T")
		return 19;
	else if(chr == "u" || chr == "U")
		return 20;
	else if(chr == "v" || chr == "V")
		return 21;
	else if(chr == "w" || chr == "W")
		return 22;
	else if(chr == "x" || chr == "X")
		return 23;
	else if(chr == "y" || chr == "Y")
		return 24;
	else if(chr == "z" || chr == "Z")
		return 25;
	else
		alert(chr + " is an invalid input!");
}


function getCharacterValue(num)
{
	if (num == 0)
		return 'A';
	else if (num == 1)
		return 'B';
	else if (num == 2)
		return 'C';
	else if (num == 3)
		return 'D';
	else if (num == 4)
		return 'E';
	else if (num == 5)
		return 'F';
    else if (num == 6)
		return 'G';		
	else if (num == 7)
		return 'H';
	else if (num == 8)
		return 'I';
	else if (num == 9)
		return 'J';
	else if (num == 10)
		return 'K';
	else if (num == 11)
		return 'L';
	else if (num == 12)
		return 'M';
	else if (num == 13)
		return 'N';
	else if (num == 14)
		return 'O';
	else if (num == 15)
		return 'P';
	else if (num == 16)
		return 'Q';
	else if (num == 17)
		return 'R';
	else if (num == 18)
		return 'S';
	else if (num == 19)
		return 'T';
	else if (num == 20)
		return 'U';
	else if (num == 21)
		return 'V';
	else if (num == 22)
		return 'W';
	else if (num == 23)
		return 'X';
	else if (num == 24)
		return 'Y';
	else if (num == 25)
		return 'Z';
	else
		alert(num + "is an invalid number/value!");

}

function getCipher()
{
	arrCipher = [];
	
	
	var i = 0, j = 0;
	for(i = 0; i < arrMsg.length; i++)
	{
	
		var tempNum; var tempChar; var a; var b;

		//console.log("index at:" + i); //o.o checking~
		a = getNumericalValue(arrMsg[i]);
		b = getNumericalValue(arrKeyword[i]);
		
		//console.log("val of msg at " + i + " = " + a + " letter is: " + arrMsg[i]); 
		//console.log("val of key at " + i + " = " + b + " letter is: " + arrKeyword[i]);
		tempNum = (a + b) % 26;
		//alert("cipher value = " + tempNum);
		
		//tempNum = ((getNumericalValue(arrMsg[i]) + getNumericalValue(arrKeyword[i])) % 26);  // was going to separate these two to see the value
		tempChar = getCharacterValue(tempNum);
		arrCipher.push(tempChar);
		//console.log("cipher at index " + i + ": " + arrCipher[i]);
		

		
	}
	
}

function decrypt()
{
	arrDecrypted = [];

	var i = 0, j = 0;
	for(i = 0; i < arrMsg.length; i++)
	{
	
	var tempNum; var tempChar; var a; var b; // a = ciphered char ; b = key char
	var diff;
	

	a = getNumericalValue(arrCipher[i]);
	b = getNumericalValue(arrKeyword[i]);
	
	diff = a - b;
	if (diff < 0)
	{
		tempNum = (a - b) % 26;
		tempNum += 26;
	}
	else
		tempNum = (a - b) % 26;
	

	
	
	tempChar = getCharacterValue(tempNum);
	arrDecrypted.push(tempChar);

	
	
	
	
	}



}


function doStuff()
{
	msgSplitString();
	iniKeyword();
	getCipher();
	decrypt();


	checkStuff();

}




function checkStuff()
{
	//display stuff (for checking only)
	
	var temp = "";

	for (var i = 0; i < arrMsg.length; i++)
	{
		temp += arrMsg[i];
	}
	
	 alert("message is: " + temp);

	 
	var temp2 = "";
	
	for (var i = 0; i < arrKeyword.length; i++)
	{
		temp2 += arrKeyword[i];
	}

	alert("keyword is : " + temp2);
	
	var temp2 = "";
	
	for (var i = 0; i < arrCipher.length; i++)
	{
		temp2 += arrCipher[i];
	}

	alert("cipher is : " + temp2);
	
	var temp3 = "";
	
	for (var i = 0; i < arrDecrypted.length; i++)
	{
		temp3 += arrDecrypted[i];
	}

	alert("decrypted is : " + temp3);
	
	
}