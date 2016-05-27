function EG_Model() {
    this.model = null;
};

// Member functions that are added to the Modelr object.
EG_Model.prototype = {
    
    // Adds a new negated assertion to the model. 
    addNegatedAssertion: function (assertionValue,id) {
            //Check to see if this is the first assertion in the model.
            if (this.model == null) {
                this.model = new egAssertion(assertionValue, true, id);
            }
            else {
                this.model.addTerm(new egAssertion(assertionValue, true, id));
            }
    }
        
}

