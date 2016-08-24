// The Existential Graph Sheet is the base of the model. Its only purpose is to store assertions and contexts
// in an initially positive context. Its uses are quite similar to the context.
function egSheet()
{
    this.terms = [];
    this.id = 0;
    // This is initialized but will never change.
    this.isNegative = false;
    // addTerm(term) adds a term to the sheet's list of terms, whether it adds an assertion or acontext.
    this.addTerm = function(term) 
    {
        this.terms.push(term)	
    };
    // insertTerm(term, index) inserts a term into the context at the index, in the case that it is needed.
    this.insertTerm = function(term,index)
    {
        this.terms.splice(index,0,term)
    };
    // returnterm() returns the term from the context.
    this.returnTerm = function(index){
	    return this.terms[index];
	}; 
	
	// removeTerm(index) removes the term at the index
	this.removeTerm = function(index){
		this.terms.splice(index,1);
		this.terms.join();
	};
    //returnTerm(index)
	//-------------------------------------------------------------------------
	this.returnTerm = function(index){
		return this.terms[index];
	}; 
    //returnTermByID(id) looks recursively through the object for an id, and if found, returns the object associated to it.
    this.returnTermByID = function(id, contextCheck)
    {
        // If the ID is 0, return something so the model knows what to do.
        if(id == 0)
            return -1;
        for(let t = 0; t < this.terms.length; t++)
        {
            let tt = this.returnTerm(t);
            if(tt instanceof egAssertion)
            {
                if(tt.id == id)
                {
                    if(contextCheck == 1)
                        return this;
                    else if(contextCheck == 2)
                        return t;
                    return tt;
                }
            }
            else if(tt instanceof egContext)
            {
                if(tt.id == id)
                {
                    if(contextCheck == 1)
                        return this;
                    else if(contextCheck == 2)
                        return t;
                }
                let checkterm = tt.returnTermByID(id, contextCheck);
                if(checkterm != null)
                    return checkterm;
            }
        }
        return null;
    };
    this.copy = function(target)
    {
      // As a context, copy itself and all of its non-context children. Context children get to follow their parent.
        con = model.addNegativeContext(target);
        for(let t of this.terms)
        {
            if(t instanceof egAssertion)
            {
                model.addAssertion(t.value, con);
            }
            else if(t instanceof egContext)
            {
                t.copy(con);
            }
        }
    };
    // toString
    this.toString = function()
    {
        // Open the term.
        let termsText = "";
        if(this.terms.length > 1)
            termsText = "(";
        for(let t of this.terms)
        {
            if(t instanceof egAssertion)
            {
                termsText += t.value;
            }
            else if(t instanceof egContext)
            {
                termsText += "!" + t.toString();
            }
            termsText += "^";
        }
        // Lop off the last karot.
        if(termsText[termsText.length-1] == "^")
            termsText = termsText.substring(0, termsText.length-1);
        // Close the term.
        if(this.terms.length > 1)
            termsText += ")";
        return termsText;
    };
}