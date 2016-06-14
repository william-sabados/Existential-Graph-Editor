function EG_Controller(model, view) {
    this.model = model;
    this.view  = view;
};

// Member functions that are added to the Controller object.
EG_Controller.prototype = {
    
    // Adds a new negated assertion to the model. 
    addNegatedAssertion: function (assertionValue,id) {

        this.model.addNegatedAssertion(assertionValue,true,id);          

    },
	// Adds a new negated assertion to the model. 
    addAssertion: function (assertionValue,id) {

        this.model.addAssertion(assertionValue,true,id);          

    },
	
	check_expression: function (thing_to_check) {
		
		if (this.model.check_expression(thing_to_check) != false)
			return this.model.check_expression(thing_to_check);
		else return false;
		
	}
	
	
	
        
}
    
    
    
