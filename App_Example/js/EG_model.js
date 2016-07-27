function EG_Model() {
    this.model = new egSheet();
    this.controller = null;
};

// Member functions that are added to the Modelr object.
EG_Model.prototype = {
    // Sets a reference to the controller.
    setController: function (controller) {
        this.controller = controller;
    },
    addNegativeContext: function (nestid) {
        //Check to see if the model lacks a sheet.
        if(this.model == null) 
        {
            // Add the sheet of assertions if it does not exist.
            this.model = new egSheet();
        }
        tmp = this.model.returnTermByID(nestid);
            if(!(tmp instanceof egAssertion))
            {
                // Notify the controller that a new context is being added.
                // Get the egId in return.
                var egId = controller.addNegativeContext(nestid);
                
                // Find where we are adding the context.
                tmp = this.model.returnTermByID(nestid);
                // If it exists, add it.
                if(tmp != false)
                {
                    if(tmp == -1)
                        this.model.addTerm(new egContext(false, egId));
                    else
                    tmp.addTerm(new egContext(tmp.isNegative, egId));
                }
            }
            return egId;

    },
    // Adds a new negated assertion to the model. 
    addNegatedAssertion: function (assertionValue, nestid) {
            //Check to see if the model lacks a sheet.
            if(this.model == null) 
            {
                // Add the sheet of assertions if it does not exist.
                this.model = new egSheet();
            }
            // Find where we are adding the term.
            tmp = this.model.returnTermByID(nestid);
            if(!(tmp instanceof egAssertion))
            {
                // Notify the controller that a new context is being added.
                // Get the egId in return.
                var egId = controller.addNegativeContext(nestid);
                // Find where we are adding the context.
                tmp = this.model.returnTermByID(nestid);
                // If it exists, add it.
                if(tmp != false)
                {
                    if(tmp == -1)
                        this.model.addTerm(new egContext(false, egId));
                    else
                    tmp.addTerm(new egContext(tmp.isNegative, egId));
                }
                if(assertionValue != "")
                {
                    // The new assertion will be nested inside of this context.
                    nestid = egId;
                    // Find where we are adding the assertion.
                    tmp = this.model.returnTermByID(nestid);
                    // Notify the controller that a new assertion is being added.
                    // Get the egId in return. 
                    egId = controller.addAssertion(assertionValue, egId);
                    // If it exists, add it. Special case for adding to sheet.
                    if(tmp != false)
                    {
                        if(tmp == -1)
                            this.model.addTerm(new egAssertion(assertionValue, egId));
                        else
                            tmp.addTerm(new egAssertion(assertionValue, egId));
                    }
                    error_submit(this.model.toString(), "console");
                    error_submit(this.model.toString(), "submit_error");
                }
            }
    },
    // If valid, removes the selected piece of the model.
    // General rule is cannot remove in a negative context.
    remove: function (id)
    {
        tmp = this.model.returnTermByID(nestid, 1)
        if(!(tmp.isNegative))
        {
           tmp.removeTerm() 
        }
    },
	addAssertion: function (assertionValue, nestid) {
            //Check to see if the model lacks a sheet.
            if(assertionValue != "")
            {
                if (this.model == null)
                {
                    // Add an empty egAssertion to start loading terms into. This needs to be updated if everything is encapsulated in a negative.
                    this.model = new egSheet();
                }
                // Find where we are adding the term.
                tmp = this.model.returnTermByID(nestid);
                if(!(tmp instanceof egAssertion))
                {
                    // Notify controller that a new assertion is being added.
                    // Get the existential graph (eg) id in return. 
                    var egId = controller.addAssertion(assertionValue, nestid);
                    // If it exists, add it. Special case for adding to sheet as well.
                    if(tmp != false)
                    {
                        if(tmp == -1)
                            this.model.addTerm(new egAssertion(assertionValue, egId));
                        else
                            tmp.addTerm(new egAssertion(assertionValue, egId));
                    }
                    error_submit(this.model.toString(), "console");
                    error_submit(this.model.toString(), "submit_error");
                }
            }
    },
    // Returns a reference to the term with the given ID currently located in the model. If it fails, returns false.
    /*findTerm: function (object,id)
    {
        // If the ID is 0, we can ignore all of this.
        if(object.id == id)
            return object;
        for(a = 0; a < object.terms.length; a++)
        {
            if(object.returnTerm(a).id == id)
                return object.returnTerm(a);
            // If what is found is an egAssertion of its own, that one's ID must be checked as well.
            else if(object.terms[0] instanceof egAssertion)
            {
                robject = model.findTerm(object.returnTerm(a), id);
               if(robject != false)
                   return robject;
            }
        }
        return false;
    },*/

	check_expression: function (thing_to_check) {
		
		//Error cases 1-7 as returned by the validator function
        thing_to_check = fixSyntax(thing_to_check);
        error = validate_input(thing_to_check);
		if (error == "error1")
		{
			return "error1";
		}
		else if (error == "error2")
		{
			return "error2";
		}
		else if (error == "error3")
		{
			return "error3";
		}
		else if (error == "error4")
		{
			return "error4";
		}
		else if (error == "error5")
		{
			return "error5";
		}
		else if (error == "error6")
		{
			return "error6";
		}
		else if (error == "error7")
		{
			return "error7";
		}

		/////////////////////////////////////////////////////
		
		else if (error == true)
		{
			return create_EG_Assertion(thing_to_check);
		}
		//else return false;
		
	},
    //Model informs the controller of its current layout.
    Rebuild: function(object)
    {
        if(!object)
        {
        }
        else
        {
            // Check if terms has more than just the the assertion value, if it does, then something is nested inside of it.
            if(object.terms.length > 1 || object.terms[0] instanceof egAssertion)
            {
                for(rbld = 0; rbld < object.terms.length; rbld++)
                {
                    this.Rebuild(object.returnTerm(rbld));
                }
            }
            // If there is just the one, figure out what it is and tell controller.
            else
            {
                // See if it is negative
                if(object.isNegated == true)
                {
                // Notify controller that the assertion exists.
                // Get the existential graph (eg) id in return. 
                egId = model.addNegatedAssertion(object.returnTerm(0));
                }
                // Not negative
                else
                {
                    // Notify controller that the assertion exists.
                    // Get the existential graph (eg) id in return. 
                egId = model.addAssertion(object.returnTerm(0));
                }
                // Stamp an ID on the object.
                object.id = egId;
            }
        }
        
    },
    // Returns the model to its original null state.
    EGclear: function()
    {
        this.model = null;
        this.modelstring = "";
    },
        
};

