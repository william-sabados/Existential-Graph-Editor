function EG_Model() {
    this.model = null;
    this.controller = null;
};

// Member functions that are added to the Modelr object.
EG_Model.prototype = {
    // Sets a reference to the controller.
    setController: function (controller) {
        this.controller = controller;
    },

    // Adds a new negated assertion to the model. 
    addNegatedAssertion: function (assertionValue) {
            // Notify controller that a new assertion is being added.
            // Get the existential graph (eg) id in return. 
            var egId = controller.addNegatedAssertion(assertionValue);
            //Check to see if this is the first assertion in the model.
            if (this.model == null) {
            //Add an empty egAssertion to start loading terms into. This needs to be updated if everything is encapsulated in a negative.
                this.model = new egAssertion();
            }
            //Now we can add the term.
            this.model.addTerm(new egAssertion(assertionValue, true, egId));

    },
	addAssertion: function (assertionValue) {
            // Notify controller that a new assertion is being added.
            // Get the existential graph (eg) id in return. 
            var egId = controller.addAssertion(assertionValue);
            //Check to see if this is the first assertion in the model.
            if (this.model == null) {
            // Add an empty egAssertion to start loading terms into. This needs to be updated if everything is encapsulated in a negative.
                this.model = new egAssertion();
            }
            // Now we can add the term.
            this.model.addTerm(new egAssertion(assertionValue, false, egId));

    },

	check_expression: function (thing_to_check) {
		
	//	if (validate_input(thing_to_check) == true)
	//	{
			parse_Items(thing_to_check, model);
	//	}
	//	else return false;
	},

    // Returns the model to its original null state.
    EGclear: function()
    {
        this.model = null;
    }
        
}

