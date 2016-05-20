////////////////////////////////////////////////////////////////////////////////////
//// NEW FUNCTIONS ////

//searchObject(object, id) - recursive maybe
//-------------------------------------------------------------------------	
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
}
	
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
document.write("<br>",eg1.id);
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
document.write("<br>Search = ",searchObject(eg1,1));
document.write("<br>EG1 = ",eg1);


document.write("<br>------------Extras Executed--------------")
	

	
	
	
