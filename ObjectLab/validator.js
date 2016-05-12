//(ex) -> ((A^B)^(C^D))
//	   ->  (A^B) is a component

// *** Change "checker" to true to enable ALL error and pass/fail outputs for testing *** //
var checker = false ;

function validate_input(str)
{
	//document.write("<br>",str);
	var tokenized = str.match(/!\(|\w|!\w|\)|\(|\^/gi);		//Tokenized array
	//document.write("<br>",tokenized,"<br>");

	var arrP = new Array();		//Array of parenthesis (may not be used?)
	var arrW = new Array();		//Array of everything but parenthesis
	var letter_count = 0;

	if (str=="()")
	{
		//document.write("<br>PASSED(0) - - -",str);	
		return true;
	}
			
	for (var x = 0; x < str.length-1; x++)
	{
		//Checks for any adjacent characters that are the same (cannot have any)
		if (str[x] == str[x+1] && ((str[x] != "(" && str[x+1] != "(") && (str[x] != ")" && str[x+1] != ")")))
		{
			if (checker) document.write("<br>ERROR::Invalid adjacent inputs");
			return false;
		}
		//Checks for incorrect "!" placements
		if (str[x].match(/\w|\)/gi) && str[x+1] == "!")
		{
			if (checker) document.write("<br>ERROR::Invalid use of not");
			return false;
		}
		
	}
	
	//Checks for any bad input characters
	if (str.match(/[^\w|\(|\)|\^|!]/gi))
	{if (checker) document.write("<br>ERROR::Improper syntax"); 
	return false;}

	//An egAssertion must be between a pair of "()"
	else if ((tokenized[0] != "(" && tokenized[0] != "!(") || (tokenized[tokenized.length-1] != ")"))
	{if (checker) document.write("<br>ERROR::Assertion must be between parenthesis"); 
	return false;}

	//Checks for the right amount of 'anded' things		
	else if (str.match(/\^/gi) && str.match(/\w/gi) && (str.match(/\w/gi).length != str.match(/\^/gi).length+1))			
	{if (checker) document.write("<br>ERROR::Uneven letters or carrots<br>"); 
	return false;}

	//Checks for even amount of braces
	else if (str.match(/\(|!\(/gi).length != str.match(/\)/gi).length)		
	{if (checker) document.write("<br>ERROR::Uneven brackets<br>"); 
	return false;}

	//Breaks up the string into indivudual components, and checks each one
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
				//Checks for "^" being the first element inside arrW while checking a multi-component string
				//  and places a pair of "(" ")" around the component, **it shouldn't have a pair before this point**
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
				//	"check_string" is what the regex checks individually for correct format
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
					if (checker) document.write("<br>FAILED - - -",check_string);
					return false;
				}
				arrW = [];					//Resets arrW to empty
			}
			else
				arrW.push(tokenized[x]);	//Pushes the next letter on to the array
		}
	}
	return true;
}

//Test string
str = "((A^B)^(C^D)^(E))";		
//str = "(A^(B^C))";
str = "!((A^!B)^(!C^D)^E)";
str = "A";

validate_input(str);



document.write("<br>----------Validator Executed-------------")
















