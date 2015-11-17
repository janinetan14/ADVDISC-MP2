function MakePlayfairSquare(key1){
	cyabc = MakeCipherABC(key1);
	row = new Array();
	for(i = 0;i < 5; i++){
		row[i]=""
	};
	for(i = 0; i < 5; i++){
		for(j = 0; j < 5; j++)
		row[i] += cyabc.charAt(5 * i + j) + " ";
	};
	sqr = "";
	for(i = 0; i < 5; i++){
		sqr += row[i] + "<br>"
	};
	showString("Key Square<br>" + sqr);
}

function MakeCipherABC(key1){
	abc = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
	key1 = key1.toUpperCase();
	cyabc = key1 + abc;
	for(i = 0; i < abc.length; i++){
		let = cyabc.charAt(i);
		pos = cyabc.indexOf(let, i + 1);
		while(pos > -1){
			cyabc = cyabc.substring(0, pos) + cyabc.substring(pos + 1, cyabc.length);
			pos = cyabc.indexOf(let, i + 1);
		};
	};
	return cyabc;
}

//dir - E-encrypt D - decrypt 
//et - text
// abc - alphabet
// key1 - keyword
// dup - j

function DoPlayfair(et, key1, dir)
{
	MakePlayfairSquare(key1);
	var regexNum = /\d/g;
	if(regexNum.test(et)){
		alert("please enter some plaintext (letters only)"); 
		return; 
	}
	
	et = et.toUpperCase();

	dup = "J";
	
	key1 = key1.toUpperCase();
	
	pos = et.indexOf(" ");
	
	
	
	//tanggal space sa text
	while(pos > -1){
		et = et.substring(0, pos) + et.substring(pos + 1, et.length);
		pos = et.indexOf(" ");
	};

	pos = et.indexOf("?");
	
	while(pos > -1){
		et = et.substring(0, pos) + et.substring(pos + 1, et.length);
		pos = et.indexOf("?");
	};
	

	//add x if same yung letter
	for(i = 0; i < et.length; i = i+2){
		let1 = et.charAt(i);
		let2 = et.charAt(i + 1);
		if(let1 == let2){
			et = et.substring(0, i + 1)+ "X" + et.substring(i + 1, et.length)
		};
	};
	
	//add x if odd length
	if( (et.length % 2) == 1 ){
		et += 'X'
	}
	
	//change j to i
	if(dup != ""){
		pos = et.indexOf(dup);
		while(pos>-1){
			et = et.substring(0, pos) + "I" + et.substring(pos + 1, et.length);
			pos = et.indexOf(dup);
		};
	};

	cyabc = MakeCipherABC(key1)
	row = new Array();
	
	for(i = 0;i < 5; i++){
		row[i] = ""
	};
	
	for(i = 0; i < 5; i++){
		for(j = 0; j < 5; j++)
		row[i] += cyabc.charAt(5 * i + j);
	};

	shf = 1;
	
	if(dir == "E"){
		shf = 1
	};
	
	if(dir == "D"){
		shf = 4
	};

	dt = "";
	for(i = 0; i < et.length; i = i+2){
	
		pos1 = cyabc.indexOf(et.charAt(i));
		pos2 = cyabc.indexOf(et.charAt(i + 1));
		
		x1 = pos1%5;
		y1 = Math.floor(pos1/5);
		x2 = pos2%5;
		y2 = Math.floor(pos2/5);

		if(y1 == y2){
			x1 = (x1+shf)%5;
			x2 = (x2+shf)%5
		}
		else if(x1==x2){
			y1 = (y1+shf)%5;
			y2 = (y2+shf)%5
		}
		else{
			temp=x1;
			x1=x2;
			x2=temp
		};

		dt += row[y1].charAt(x1) + row[y2].charAt(x2);
	};
	return dt;
};