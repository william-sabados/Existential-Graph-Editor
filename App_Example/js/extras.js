////////////////////////////////////////////////////////////////////////////////////
//// NEW FUNCTIONS ////

//searchObject(object, id) - recursive maybe
//	First test search function
/*
function searchObject(object, id)
{
	if (object.id === id) {return object;}
	for (var x in object)
	{
		if (object.hasOwnProperty(x))
		{
			var foundID = searchObject(object[x],id);
			if (foundID) {return foundID;}
		}
	}
	return null;
}*/
//searchObject2(object, id) - recursive
/*function searchObject2(object, id)
{
	for (var x = 0; x < object.terms.length; x++)
	{
		//document.write("<br>",object.terms[x]);
		for (var y = 0; y < object.terms[x].terms.length; y++)
		{
			//document.write("<br>",typeof object.terms[x].terms[y]);
			if (typeof object.terms[x].terms[y] === 'object')
			{
				//document.write("<br>YUS");
				return searchObject2(object.terms[x].terms[y],id);
			}
		}
		//document.write("<br>",object.terms[x]);
		if (object.terms[x].id == id)
		{
			//document.write("<br>FOUND:",object.terms[x]);
			return object.terms[x];
		}
	}
	return null;
}*/
function searchObject2(object, id)
{
	for (var x = 0; x < object.terms.length; x++)
	{ 
		if (object.terms[x].id == id)
		{
			// Found what we were looking for.
			return object.terms[x];
		}
		
		if (typeof object.terms[x] == 'string')
		{
			// We found a string.  Do nothing.
		}
		else if (typeof object.terms[x] != 'string')
		{
			// We found an object we need to search the contents of.
			var searchResult = searchObject2(object.terms[x],id);
			
			if (searchResult != null)
				return searchResult;
		}
	}
	
	return null;
}
//-------------------------------------------------------------------------
	
//addDoubleNegation(object)
//-------------------------------------------------------------------------	
function addDoubleNegation(object)
{
	var newEG1 = new egAssertion(true);
	newEG1.addTerm(object);
	var newEG2 = new egAssertion(true);
	newEG2.addTerm(newEG1);
	return newEG2;
}

//removeDoubleNegation(object)
//-------------------------------------------------------------------------	
function removeDoubleNegation(object)
{
	var str = object.toString();
	str = str.replace(/\s/g, "");	//REGEX to strip any whitespace
	str = str.slice(4,str.length-2);
	var tokenized = str.match(/!\(|\w|!\w|\)|\(/gi);
	var newEG = parse_Items(tokenized);
	return newEG;
}

//canRemoveNegation(object) - boolean
//-------------------------------------------------------------------------	
function canRemoveNegation(object)
{
	var str = object.toString();
	str = str.replace(/\s/g, "");	//REGEX to strip any whitespace
	
	if (str[0] != "!" && str[1] != "(" && str[str.length-1] != ")")
		return false;
	else if (str[2] != "!" && str[3] != "(" && str[str.length-2] != ")")
		return false;
	else 
		return true;
}

var eg1 = new egAssertion("P",true);
eg1.id = 1;
document.write("<br>EG1 stock = ",eg1);
	
eg1 = addDoubleNegation(eg1);
document.write("<br>EG1 after add = ",eg1);

eg1 = removeDoubleNegation(eg1);
document.write("<br>EG1 after rem = ",eg1);

document.write("<br>Can remove? ",canRemoveNegation(eg1));

document.write("<br>");
eg1 = addDoubleNegation(eg1);
document.write("<br>EG1 after add = ", eg1);

document.write("<br>Can remove? ",canRemoveNegation(eg1));

document.write("<br>");
eg1 = new egAssertion("P",true);
eg1.id = 1;
eg1 = addDoubleNegation(eg1);
document.write("<br>EG1 = ",eg1);
//document.write("<br>Search = ",searchObject(eg1,1));

document.write("<br>");
var eg3 = new egAssertion("S",true);
//eg3.addTerm("T");
eg3.id = 1;
var eg4 = new egAssertion("Q",true);
//eg4.addTerm("U");
eg4.id = 2;
var eg5 = new egAssertion("R",true);
//eg5.addTerm("V");
eg5.id = 3;
var eg6 = new egAssertion(true);
var eg11 = new egAssertion("X",true);
eg11.id = 6;
var eg22 = new egAssertion("Y",true);
eg22.id = 7;
var eg33 = new egAssertion("Z",true);
eg33.id = 8;
eg3.addTerm(eg11);
eg4.addTerm(eg22);
eg5.addTerm(eg33);
eg6.addTerm(eg3);
eg6.addTerm(eg4);
eg6.addTerm(eg5);
//eg6 = addDoubleNegation(eg6);
document.write("<br>- - - - - - - - - - - - - - - -<br>EG6 = ",eg6);

document.write("<br>Search = ",searchObject2(eg6,3));

var test = new egAssertion();
//test = searchObject2(eg6,3);
// document.write("<br>Test = ",test);

//document.write("<br>", eg6.terms[0].terms[1].id);

document.write("<br>------------Extras Executed--------------")
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
