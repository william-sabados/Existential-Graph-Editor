function EG_Controller(model, view) {
    this.model = model;
    this.view  = view;

    this.egId = 0;  // The last existential graph assertion ID generated by the controller.
};

// Member functions that are added to the Controller object.
EG_Controller.prototype = {
    
    // Adds a new negated assertion to the view.
    addNegativeContext: function (nestId) {
	// TODO controller fake select
        var newId = this.incrementId();
        this.view.addNegativeContext(newId, nestId);          
        return newId;
    },
	// Adds a new assertion to the view.
    addAssertion: function (assertionValue, nestId) {
		// TODO controller fake select
        var newId = this.incrementId();
        this.view.addAssertion(assertionValue,newId, nestId);          
        return newId;
    },
	
    check_expression: function (thing_to_check) {
		
		//Error cases 1-7 as returned by the validator function
		error = model.check_expression(thing_to_check);
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
		else 
		{
			return error;
		}
		//else return false;
		
	},

	
    // This function handles incrementing the egID so that unique IDs
    // are created for each new assertion.
    incrementId() {
        this.egId++;
        return this.egId;
    }, 
    // This function resets the controller's ID counter and notifies
    // the model that it should also clear.
    EGclear: function()
    {
        this.egId = 0;
        model.EGclear();
    },
}
    
    
    
