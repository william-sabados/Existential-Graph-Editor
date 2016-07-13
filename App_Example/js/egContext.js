// The context governs whether something is positive or negative, as well as nesting. All assertions are stored
// Either in a context or the full sheet.
function egContext(prevContext, id)
{
    this.isNegative= !prevContext;
    this.terms = [];
    this.id = id;

    // invert() swaps the current negation status, for when it is nested.
    this.invert = function()
    {
        this.isNegative = !this.isNegative;
    }
    // addTerm(term) adds a term to the context's list of terms, whether it adds an assertion or another context.
    this.addTerm = function(term) 
    {
        this.terms.push(term)	
    };
    //insertTerm(term, index) into the context, in the case that it is needed.
    this.insertTerm = function(term,index)
    {
        this.terms.splice(index,0,term)
    };
    //returnTermByID(id) looks recursively through the object for an id, and if found, returns the object associated to it.
    this.returnTermByID = function(object, id)
    {
        // If this is the correct object, return it.
        if(object.id == id)
            return object;
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
                return t.returnTermByID(t,id);
            }
        }
        return false;
    };
    // TODO toString followup function
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
        termsText = termsText.substring(0, termsText.length-1);
        // Close the term.
        termsText += ")";
        return termsText;
    };
}