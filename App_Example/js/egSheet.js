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
    //returnTermByID(id) looks recursively through the object for an id, and if found, returns the object associated to it.
    this.returnTermByID = function(id)
    {
        // If the ID is 0, return something so the model knows what to do.
        if(id == 0)
            return -1;
        for(t of this.terms)
        {
            if(t instanceof egAssertion)
            {
                if(t.id = id)
                {
                    return t;
                }
            }
            else if(t instanceof egContext)
            {
                return t.returnTermByID(t, id);
            }
        }
        return false;
    };
    // toString
    this.toString = function()
    {
        // Open the term.
        var termsText = "(";
        for(t of this.terms)
        {
            if(t instanceof egAssertion)
            {
                termsText += t.value;
            }
            else if(t instanceof egContext)
            {
                termsText += t.toString();
            }
            termsText += "^"
        }
        // Lop off the last karot.
        termsText = termsText.substring(0, termsText.length-1);
        // Close the term.
        termsText += ")";
        return termsText;
    };
}