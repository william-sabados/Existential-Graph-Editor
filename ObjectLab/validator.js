	//OLD//
//str = "((A^B)^(C^D))";
//str = "!((A^!B)^!C^((!B)^!A)^(C^(D))^!A^((C)))";
//str = "(((A^B)^(!C^D)^!(E)))";
/*
str2 = str;
document.write("<br>",str,"<br>");
var arr = new Array();
for (var x = 0; x < str.length; x++)
{
	//document.write("<br>",x);
	if (str[x] == "(")
	{
		//document.write("<br>;",str[x]);
		arr.push(x);
	}
	else if (str[x] == ")")
	{
		//document.write("<br>::",arr);
		var r = arr.pop();
		//document.write("<br>::",arr);
		var temp = str.slice(r,x+1);
		document.write("<br>",temp);
		if (temp.match(/(^((\(|!\()((\w)|(\(\w\))|(!\w)|(!\(\w\)))\^)(((\w)|(\(\w\))|(!\w)|(!\(\w\)))\^)*(((\w)|(\(\w\))|(!\w)|(!\(\w\)))\))$)|(\w)|(\(\w\))|(!\w)|(!\(\w\))/gi))
		{	
			document.write("<br>PASSED");
			//document.write("<br>:::",r)
			//document.write("<br>::",arr);
			if (r != 0)
			{
				str2 = str2.replace(str.substring(r+1,x),"X");
				//document.write(str.substring(r+1,x));
				//document.write("<br>",str2);
			}	
			//document.write("<br>",r);
		}
		else
			document.write("<br>*FAILED*");
	}
	//document.write("<br>",arr);
	//document.write("<br>",str[x]);
}
document.write("<br>",str2);
*/
	//OLD//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//NEW//

//(ex) -> ((A^B)^(C^D))
//	   ->  (A^B) is a component

str = "((A^B)^(C^D)^(E))";		//Test string

document.write("<br>",str);
var tokenized = str.match(/!\(|\w|!\w|\)|\(|\^/gi);		//Tokenized array
document.write("<br>",tokenized,"<br>");

var arrP = new Array();		//Array of parenthesis (may not be used?)
var arrW = new Array();		//Array of everything but parenthesis
var letter_count = 0;

		//Checks for the right amount of 'anded' things
		if (str.match(/\w/gi).length != str.match(/\^/gi).length+1)			
			document.write("<br>ERROR::Uneven letters or carrots<br>");

		//Checks for even amount of braces
		if (str.match(/\(|!\(/gi).length != str.match(/\)/gi).length)		
			document.write("<br>ERROR::Uneven brackets<br>");

//Breaks up the string into indivudual components, and checks each one
// ** Does not replace each component after checking **
for (var x = 0; x < tokenized.length; x++)		
{
	//I don't think this is used anywhere else...
	if (tokenized[x] == "(" || tokenized[x] == "!(")	
	{
		arrP.push(tokenized[x]);
	}
	else if (tokenized[x] == ")")
	{
		//Checks for "^" being the first element inside arrW while checking a multi-component string
		//  and places a pair of "(" ")" around the component, *it shouldn't have a pair before this point*
		if (arrW[0] == "^")
		{
			arrW.splice(0,1);
		}
		arrW.unshift("(");
		arrW.push(tokenized[x]);
		
		//Concatenates a string to re-create the component
		var check_string = "";
		for (var y = 0; y < arrW.length; y++)
			check_string = check_string.concat(arrW[y]);
		
		//Regex to check a single letter component, i.e. "(E)"
		if (check_string.length < 5 && check_string != "()")
		{
			if (check_string.match(/(\w)|(\(\w\))|(!\w)|(!\(\w\))/gi).length == 1)
				document.write("<br>PASSED(1) - - -",check_string);		
		}	
		//Regex to check each component
		else if (check_string.match(/^((\(|!\()((\w)|(\(\w\))|(!\w)|(!\(\w\)))\^)(((\w)|(\(\w\))|(!\w)|(!\(\w\)))\^)*(((\w)|(\(\w\))|(!\w)|(!\(\w\)))\))$/gi))
		{
			document.write("<br>PASSED(2) - - -",check_string);
		}
		//Checks the ending case, first / last pair of parends
		else if (check_string == "()" && (x+1) == tokenized.length)
			document.write("<br>PASSED(3) - - -",check_string);
		else
			document.write("<br>FAILED - - -",check_string);
		arrW = [];		//Resets arrW to empty
	}
	else
		arrW.push(tokenized[x]);	//Pushes the next letter on to the array
}

//document.write("<br>",tokenized.length);


document.write("<br>----------Validator Executed-------------")
















