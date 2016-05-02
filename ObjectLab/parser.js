function egAssertion()
{
	/*if (arguments.length == 0)
	{
		document.write("<br>WORKED<br>");
		this.isNegated = true;
		this.terms = new Array();
		
	}*/
	if (arguments.length == 1){
		this.isNegated = arguments[0];
		this.terms = new Array();
	}
	else {
		this.isNegated = arguments[1];
		this.terms = new Array();
		this.terms.push(arguments[0]);
	}

	this.negate = function() {
		if (this.isNegated == true)
			this.isNegated = false;
		else 
			this.isNegated = true;
	};	
	
	// setNegate(value)
	//-------------------------------------------------------------------------
	this.setNegate = function(value){
		this.isNegated = value;
	};
	
	// addTerm()
	//-------------------------------------------------------------------------
	this.addTerm = function(term) {
		this.terms.push(term)	
	};
	
	//insertTerm(term, index)
	//-------------------------------------------------------------------------
	this.insertTerm = function(term,index){
		//this.terms[index].addTerm(term)
		//document.write(this.terms.join())
		console.log(this.terms.join())
		this.terms.splice(index,0,term)
		//document.write(this.terms.join())
		console.log(this.terms.join())
	};	
	
	//returnTerm(index)
	//-------------------------------------------------------------------------
	this.returnTerm = function(index){
		return this.terms[index];
	}; 
	
	// removeTerm(index)
	//-------------------------------------------------------------------------
	this.removeTerm = function(index){
		this.terms.splice(index,1);
		this.terms.join();
	};
	
	// toString()
	//-------------------------------------------------------------------------
	// This method iterates through the terms of the assertion and creates
	// string friendly output.
	this.toString = function() {
		var termsText = "";
		
		// Check to see if this assertion is negated.
		if (this.isNegated == true)
			termsText = "!( ";
		else termsText = "( ";
		
		for (var i=0; i < this.terms.length; i++) {
			// If not first term add conjunction symbol.
			if (i != 0)
				termsText = termsText + " ^ ";
			
			// Based on what's in the term we decide what to do.
			if (this.terms[i] == "")								// This checks to see if the term is an empty string (i.e. "")	
				termsText = termsText + " ";
			else if (this.terms[i] instanceof egAssertion)		// It contains another egAssertion object. Recursive dive.
				termsText = termsText + this.toStringDive(this.terms[i]);
			else												// Just a plain old text term, just print it.
				termsText = termsText + this.terms[i];
		}
		
		termsText = termsText + " )";
		return termsText;
	};
	
	// toStringDive()
	//-------------------------------------------------------------------------
	// This is a recursive method the dives through the terms objects and creates
	// string friendly output.
	this.toStringDive = function(edObj) {
		var termsText = "";
		
		// Check to see if this assertion is negated.
		if (edObj.isNegated == true)
			termsText = "!( ";
		else termsText = "( ";
		
		for (var i=0; i < edObj.terms.length; i++) {
			// If not first term add conjunction symbol.
			if (i != 0)
				termsText = termsText + " ^ ";
		
			// Based on what's in the term we decide what to do.
			if (edObj.terms[i] == "")						// This checks to see if the term is an empty string (i.e. "")	
				termsText = termsText + " ";
			else if (edObj.terms[i] instanceof egAssertion)	// This checks to see if the term is an empty string (i.e. "")
				termsText = termsText + this.toStringDive(edObj.terms[i]);
			else										// Just a plain old text term, just print it.
				termsText = termsText + edObj.terms[i];
		}
		
		termsText = termsText + " )";
		return termsText;
	}
	
}

function foo(parsed)
{
	document.write("<br>Parsed = ",parsed);
	var stackCount = 0, count;
	count = 0;
	for (var i = 0 ; i < (parsed.length-1) ; i++)
	{
		
		if (parsed[i] == "!(")
		{
			var newAssert = new egAssertion(true);
			newAssert.setNegate(true);
			//newAssert.addTerm(parsed[i]);
			stackCount++;
			count++;
			//document.write(parsed[i]);
		}
		else if (parsed[i] == "(")
		{
			var newAssert = new egAssertion(false);
			newAssert.setNegate(false);
			//newAssert.addTerm(parsed[i]);
			stackCount++;
			count++;
			//document.write(parsed[i]);
		}
		
		else if (parsed[i] != ")")
		{
			newAssert.addTerm(parsed[i]);
			//document.write("<br>",parsed[i]);
		}
		document.write("<br>newAssert = ",newAssert);
		//document.write("<br>",count);

		if ((parsed[i] == "(" || parsed[i] == "!(") && count > 1)
		{
			for (var j = i+1 ; j < parsed.length ; j++)
			{
				if (parsed[j] == "(" || parsed[j] == "!(")
				{
					stackCount++;
					//document.write(parsed[j]);
				}
				else if (parsed[j] == ")" && stackCount != 1)
				{
					stackCount--;
					//document.write(parsed[j]);
				}
				else if (parsed[j] == ")" && stackCount == 1)
				{
					//document.write("<br>",parsed.slice(i,j));
					newAssert.addTerm = foo(parsed.slice(i,j));
					//document.write(parsed[j]);
				}
			}
			//i = j;
			

		}
		
		//document.write("<br>",parsed[i]);
		//document.write("<br>",newAssert);
		//document.write("<br>",i);
	}
	
	//document.write("<br>newAssert = ",newAssert);
	
}	

//str = "!(!(!A^!B)^!C)";
str = "(((A^B)^(C^D)^(E)))";
str = "(((A^B)))";
str = "(A^B)";
document.write("<br><br>",str);
document.write("<br><br>",str.match(/!\(|\w|!\w|\)|\(/gi)); //<---regex to parse 'str'
document.write("<br><br>--------------------------------------------------<br><br>");
var parse = str.match(/!\(|\w|!\w|\)|\(/gi);	//<-array of parsed input
//document.write("<br>",parsed);

//document.print("<br>",foo(parse));
foo(parse);

//var one = (foo(parsed));
//document.write("<br>",parse);



document.write("<br><br>-------------------------------------------------<br>INNER");
















