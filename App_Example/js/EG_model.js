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
    addNegatedAssertion: function (assertionValue,id) {
            //Check to see if this is the first assertion in the model.
            if (this.model == null) {
                this.model = new egAssertion(assertionValue, true, id);
            }
            else {
                this.model.addTerm(new egAssertion(assertionValue, true, id));
            }
    },
	addAssertion: function (assertionValue,id) {
            //Check to see if this is the first assertion in the model.
            if (this.model == null) {
                this.model = new egAssertion(assertionValue, false, id);
            }
            else {
                this.model.addTerm(new egAssertion(assertionValue, false, id));
            }
    },
	
	check_expression: function (thing_to_check) {
		
		//Error cases 1-7 as returned by the validator function
		if (validate_input(thing_to_check) == "error1")
		{
			return "error1";
		}
		else if (validate_input(thing_to_check) == "error2")
		{
			return "error2";
		}
		else if (validate_input(thing_to_check) == "error3")
		{
			return "error3";
		}
		else if (validate_input(thing_to_check) == "error4")
		{
			return "error4";
		}
		else if (validate_input(thing_to_check) == "error5")
		{
			return "error5";
		}
		else if (validate_input(thing_to_check) == "error6")
		{
			return "error6";
		}
		else if (validate_input(thing_to_check) == "error7")
		{
			return "error7";
		}

		/////////////////////////////////////////////////////
		
		else if (validate_input(thing_to_check) == true)
		{
			return parse_Items(thing_to_check);
		}
		//else return false;
		
	}
        
}

