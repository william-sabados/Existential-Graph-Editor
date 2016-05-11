
//(ex) -> ((A^B)^(C^D))
//	   ->  (A^B) is a component

function validate_input(str)
{
	document.write("<br>",str);
	var tokenized = str.match(/!\(|\w|!\w|\)|\(|\^/gi);		//Tokenized array
	document.write("<br>",tokenized,"<br>");

	var arrP = new Array();		//Array of parenthesis (may not be used?)
	var arrW = new Array();		//Array of everything but parenthesis
	var letter_count = 0;

	//Checks for any bad input characterSet
	if (str.match(/[^\w|\(|\)|\^|!]/gi))
		document.write("<br>ERROR::Improper syntax");

	//An egAssertion must be between a pair of "()"
	else if ((tokenized[0] != "(" || tokenized[0] != "!(") &&(tokenized[tokenized.length-1]!=")"))
		document.write("<br>ERROR::Assertion must be between parenthesis");

	//Checks for the right amount of 'anded' things		
	else if (str.match(/\^/gi) && str.match(/\w/gi) && (str.match(/\w/gi).length != str.match(/\^/gi).length+1))			
		document.write("<br>ERROR::Uneven letters or carrots<br>");

	//Checks for even amount of braces
	else if (str.match(/\(|!\(/gi).length != str.match(/\)/gi).length)		
		document.write("<br>ERROR::Uneven brackets<br>");

	//Breaks up the string into indivudual components, and checks each one
	// ** Does not replace each component after checking **
	else
	{
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
				{
					document.write("<br>FAILED - - -",check_string);
					//return false;
				}
				arrW = [];		//Resets arrW to empty
			}
			else
				arrW.push(tokenized[x]);	//Pushes the next letter on to the array
		}
	}
	
	return true;
}

str = "((A^B)^(C^D)^(E))";		//Test string
//str = "(A^(B^C))";

validate_input(str);

document.write("<br>----------Validator Executed-------------")





