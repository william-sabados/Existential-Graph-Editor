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
    // removeTerm(index)
	//-------------------------------------------------------------------------
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
        if(contextCheck == null)
            contextCheck = 0;
        // If this is the correct object, return it.
        if(this.id == id)
        {
            return this;
        }
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
    // Functionally copy from the context level.
    this.copy = function(target, num)
    {
        if(num == 1)
        {
            if(!model.isRemovable(target, this.toString()))
            {
                return;
            }
            if(this.copyCheck(target) == false)
            {
                return;
            }
        }
         // As a context, copy itself and all of its non-context children. Context children get to follow their parent.
        let con = model.addNegativeContext(target);
        for(let t of this.terms)
        {
            t.copy(con, 0);
        }
        return true;
    };
    this.copyCheck = function(target)
    // Ensures what is being copied occurs NOWHERE in the target location.
    {
        let rVal = true;
        if(target == this.id)
            return false;
        for(t of this.terms)
        {
            if(t instanceof egAssertion)
            {
                if(target == t.id)
                    return false;
            }
            else
            {
                rVal = t.copyCheck(target);
            }
        }
        return rVal;
    };
    // toString capable of calling other object's toString.
    this.toString = function()
    {
        // Open the term.
        let termsText = "(";
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
            termsText += "&";
        }
        if(termsText[termsText.length-1] == "&")
            termsText = termsText.substring(0, termsText.length-1);
        // Close the term.
        termsText += ")";
        return termsText;
    };
}