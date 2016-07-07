//(ex) -> ((A^B)^(C^D))
//	   ->  (A^B) is a component

// *** NOTE: The check cases need to be in correct order to function as intended *** //

// * Change "checker" to true to enable ALL error and pass/fail outputs for testing * //

// PROBLEM 	7/7/16 - - - In each return statement for error checking, validatorTester only works correctly if "checker" is set to true because of braces
// FIX 		7/7/16 - - - Must run validatorTester while checker is set to "true" in this file, and manually go through the restults



var checker = false ;

function validate_input(str)
{
	
	/*
	if (checker) document.write("<br>String = ",str);
	var tokenized = str.match(/!\(|\w|!\w|\)|\(|\^/gi);		//Tokenized array
	if (checker) document.write("<br>Tokenized = ",tokenized,"<br>");

	var arrP = new Array();		//Array of parentheses' indeces
	var arrW = new Array();		//Array of everything but parenthesis - keeps track of things inside a pair of "()"

	////////////////////////// START OF CHECKS ///////////////////////////////////
	
	//......
	for (var x = 0; x < str.length-1; x++)
	{
		var check1 = str[x].match(/\w/gi);
		var check2 = str[x+1].match(/\w/gi);
		//Checks for any adjacent characters that are the same (cannot have any)
		if ((check1 != null && check2 != null) && ((str[x] != "(" && str[x+1] != "(") && (str[x] != ")" && str[x+1] != ")")))
		{
			if (checker) {document.write("<br>ERROR::Invalid adjacent inputs");return false;}
			if (!checker) {return "error1";}
		}
		//Checks for incorrect "!" placements
		if (str[x].match(/\w|\)/gi) && str[x+1] == "!")
		{
			if (checker) {document.write("<br>ERROR::Invalid use of not");return false;}
			if (!checker) {return "error2";}
		}
	}
	
	//Checks for even amounts of letters and "^"'s
	//Initial check for even ^'s
	var check1 = str.match(/\w/gi);
	var check2 = str.match(/\^/gi);
	if (check1 != null && check2 == null && str.length > 4)
	{
		if (checker) {document.write("<br>ERROR::Uneven letters or carrots(1)");return false;}
		if (!checker) {return "error3";}
	}
	
	//Checks for any bad input characters
	if (str.match(/[^\w|\(|\)|\^|!]/gi))
	{
		if (checker) {document.write("<br>ERROR::Improper syntax"); return false;}
		if (!checker) {return "error4";}	
	}
	
	//An egAssertion must be between a pair of "()"
	else if ((tokenized[0] != "(" && tokenized[0] != "!(") || (tokenized[tokenized.length-1] != ")"))
	{
		if (checker) {document.write("<br>ERROR::Assertion must be between parenthesis");return false;}
		if (!checker) {return "error5";}
	}

	//Checks a 'base case' of an empty assertion "()"
	//Cases checked are: 1="()"; 2="!()"; 3="()^()"; 4="(())"
	else if (str=="()" || str=="!()" || (str.match(/^(\(\)\^)(\(\)\^)*(\(\))$/gi)) || (str.match(/\(|!\(/gi).length == str.match(/\)/gi).length && !str.match(/[^\(|\)]/gi)))
	{if (checker) document.write("<br>PASSED(0) - - -",str);	
	return true;}
	
	//Checks for the right amount of 'anded' things	
	//Secondary checks for ^'s are: ^ && \w are not null; amount of ^'s must be 1 less than amount of letters
	else if (str.match(/\^/gi) != null && str.match(/\w/gi) != null && (str.match(/\w/gi).length != str.match(/\^/gi).length+1))			
	{
		if (checker) {document.write("<br>ERROR::Uneven letters or carrots(2)<br>");return false;}
		if (!checker) {return "error3";}
	}

	//Checks for even amount of braces
	else if (str.match(/\(|!\(/gi).length != str.match(/\)/gi).length)		
	{
		if (checker) {document.write("<br>ERROR::Uneven brackets<br>");return false;}
		if (!checker) {return "error6";}
	}

	////////////////////////// END OF CHECKS ///////////////////////////////////
	//Initial checks all passed
	//Breaks up the string into indivudual components, and further checks each one for correctness
	else
	{
		for (var x = 0; x < tokenized.length; x++)		
		{
			//Pushes the INDEX of a given opening brace on to "arrP"
			if (tokenized[x] == "(" || tokenized[x] == "!(")	
			{
				arrP.push(x);
			}
			else if (tokenized[x] == ")")
			{
				var last_openBrace = arrP.pop();
				//Checks for "^" being the first element inside arrW while checking a multi-component string (i.e. "((A^B)^(C^D))")
				//  and places a pair of '(' ')' around the component, **it shouldn't have a pair before this point**
				if (arrW[0] == "^")
				{
					arrW.splice(0,1);
				}
				if (tokenized[last_openBrace] == "(")
				arrW.unshift("(");
				else 
				arrW.unshift("!(");
				arrW.push(tokenized[x]);
				
				//Replaces a given module in "tokenized" with a single letter ("X") b/c regex pattern works incorrectly otherwise
				var temp = tokenized.slice(last_openBrace,x+1);
				for (var y = 0; y < temp.length; y++)
				{
					tokenized.splice(last_openBrace,1);
				}
				tokenized.splice(last_openBrace,0,"X");
				
				x = x - temp.length;	//Resizes the "for" loop's index to adjust for the change in "tokenized"
				
				//Concatenates a string (check_string) to re-create the component/module
				//	"check_string" is the 'component' that the regex checks for correct format
				var check_string = "";
				for (var y = 0; y < temp.length; y++)
				{
					check_string = check_string.concat(temp[y]);
				}
				
				//// *** REGEX CHECKING PART *** ////
				//Regex to check a single letter component, i.e. "(E)"
				if ((check_string.length < 5 || (check_string.length == 5 && check_string[0] == "!")) && check_string != "()")
				{
					if (check_string.match(/(\w)|(\(\w\))|(!\w)|(!\(\w\))/gi).length == 1)
					{
						if (checker) document.write("<br>PASSED(1) - - -",check_string);		
					}
				}	
				//Regex to check each component
				else if (check_string.match(/^((\(|!\()((\w)|(\(\w\))|(!\w)|(!\(\w\)))\^)(((\w)|(\(\w\))|(!\w)|(!\(\w\)))\^)*(((\w)|(\(\w\))|(!\w)|(!\(\w\)))\))$/gi))
				{
					if (checker) document.write("<br>PASSED(2) - - -",check_string);
				}
				//Checks the ending case, first/last pair of parends
				else if (check_string == "()" && (x+1) == tokenized.length)
				{
					if (checker) document.write("<br>PASSED(3) - - -",check_string);
				}
				else
				{
					if (checker) {document.write("<br>FAILED - - -",check_string);return false;}
					if (!checker) {return "error7";}
				}
				arrW = [];					//Resets arrW to empty
			}
			else
				arrW.push(tokenized[x]);	//Pushes the next letter on to the array
		}
	}
	return true;
	*/
	return "error1";
}

/*str = "(A)(A)";
str = "((A)A)";
str = "()^()^()";
str = "(A)";

validate_input(str);*/




document.write("<br>----------Validator Executed-------------");



