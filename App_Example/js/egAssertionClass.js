function egAssertion()
{
	this.isNegated = false;
	this.terms = [];
	this.id = 0;
	
	if (arguments.length == 0)			//Creates empty eg
	{
		//document.write("<br>WORKED<br>");
		this.isNegated = false;
		this.terms = [];
		this.id = 0;
	}
	else if (arguments.length == 1){	//Creates empty eg with given negation value
		this.isNegated = arguments[0];
		this.terms = [];
		this.id = 0;
	}
	else {								//Creates eg with given negation value and pushes a term
		this.isNegated = arguments[1];
		this.terms = [];
		this.terms.push(arguments[0]);
		this.id = 0;
	}
    
	//toggles negation
	//------------------------------------------------------------------------
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
		this.terms.splice(index,0,term)
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
	
	////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	// toString()
	//-------------------------------------------------------------------------
	// This method iterates through the terms of the assertion and create_EG_Assertions
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
	// This is a recursive method the dives through the terms objects and create_EG_Assertions
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
			else if (edObj.terms[i] instanceof egAssertion)	// This checks to see if the term is an assertion. (i.e. "")
				termsText = termsText + this.toStringDive(edObj.terms[i]);
			else										// Just a plain old text term, just print it.
				termsText = termsText + edObj.terms[i];
		}
		
		termsText = termsText + " )";
		return termsText;
	}
	
}

document.write("<br>----egAssertionClass Exetuded---------");






