function egAssertion(term, isNegated)
{
	// Object Constructor
	// ========================================================================
	this.isNegated = isNegated;	// Expected values [true|false] If true, the terms of the assertion are negated.  

	this.terms = new Array();	// Array that holds the terms (or symbols) of the assertion.   
	this.terms.push(term);		// It is assumed that all of the terms in the array are joined by conjunction.
								// Expected values in the array are individual terms (e.g. P,Q,R) or nested egAssertion objects.
	
	// Object Methods
	// ========================================================================
	
	// negate()
	//-------------------------------------------------------------------------
	// Negate toggles the isNegated property between TRUE and FALSE;
	this.negate = function() {
		if (this.isNegated == true)
			this.isNegated = false;
		else 
			this.isNegated = true;
	};
	
	
	// setNegate(value)
	//-------------------------------------------------------------------------
	// Future method goes here.
	
	// addTerm()
	//-------------------------------------------------------------------------
	this.addTerm = function(term) {
		this.terms.push(term)	
	};
	
	
	//insertTerm(term, index)
	//-------------------------------------------------------------------------
	// Future method goes here.
	
	
	//returnTerm(index)
	//-------------------------------------------------------------------------
	// Future method goes here.
	
	
	// removeTerm(index)
	//-------------------------------------------------------------------------
	// Future method goes here.
	
	
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