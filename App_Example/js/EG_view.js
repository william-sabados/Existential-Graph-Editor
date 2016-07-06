 graph = new joint.dia.Graph;
    //var paper = new joint.dia.Paper({ el: $('#myholder'), width: 650, height: 250, gridSize: 1, model: graph });

    // Change size of EG element.
    graph.on('change:size', function(cell, newPosition, opt) {

        if (opt.skipParentHandler) return;

        if (cell.get('embeds') && cell.get('embeds').length) {
            // If we're manipulating a parent element, let's store
            // it's original size to a special property so that
            // we can shrink the parent element back while manipulating
            // its children.
            cell.set('originalSize', cell.get('size'));
        }
    });

    // Change position of EG element.
    graph.on('change:position', function(cell, newPosition, opt) {

        if (opt.skipParentHandler) return;

        if (cell.get('embeds') && cell.get('embeds').length) {
            // If we're manipulating a parent element, let's store
            // it's original position to a special property so that
            // we can shrink the parent element back while manipulating
            // its children.
            cell.set('originalPosition', cell.get('position'));
        }

        var parentId = cell.get('parent');
        if (!parentId) return;

        var parent = graph.getCell(parentId);
        var parentBbox = parent.getBBox();

        if (!parent.get('originalPosition')) parent.set('originalPosition', parent.get('position'));
        if (!parent.get('originalSize')) parent.set('originalSize', parent.get('size'));

        var originalPosition = parent.get('originalPosition');
        var originalSize = parent.get('originalSize');

        var newX = originalPosition.x;
        var newY = originalPosition.y;
        var newCornerX = originalPosition.x + originalSize.width;
        var newCornerY = originalPosition.y + originalSize.height;

        _.each(parent.getEmbeddedCells(), function(child) {

            var childBbox = child.getBBox();

            if (childBbox.x < newX) { newX = childBbox.x; }
            if (childBbox.y < newY) { newY = childBbox.y; }
            if (childBbox.corner().x > newCornerX) { newCornerX = childBbox.corner().x; }
            if (childBbox.corner().y > newCornerY) { newCornerY = childBbox.corner().y; }
        });

        // Note that we also pass a flag so that we know we shouldn't adjust the
        // `originalPosition` and `originalSize` in our handlers as a reaction
        // on the following `set()` call.
        parent.set({
            position: { x: newX, y: newY },
            size: { width: newCornerX - newX, height: newCornerY - newY }
        }, { skipParentHandler: true });
    });



function EG_View() { 
   this.controller = null;

    
};

// Member functions that are added to the View object.
EG_View.prototype = {
    
    // Sets a reference to the controller.
    setController: function (controller) {
        this.controller = controller;
    },
    
    // Adds a new assertion to the graph when the 'Add Assertion' button pressed.
    // TODO:  Needs to pick and empty place to add the new assertion.  
    addNegatedAssertion: function (assertionValue,newId) {
        
        w = assertionValue * 10;
        // Prepare to add shape to the graph.        
        var newRectangle = new joint.shapes.basic.Circle({
            position: { x: 170, y: 25 },
            size: { width: 50, height: 40 },
            attrs: { circle: { fill: '#F1C40F', rx: 20, ry: 20 }, text: { text: assertionValue } }
        });
        //
        // Add edId as a property to the graph element.
        newRectangle.set('egId', newId);

        //Embedding (if someone knows a better way, be my guest to change this)
        if(selection) selection.model.embed(newRectangle);

        // Add the assertion to the graph.    
        graph.addCells([newRectangle]);
    },
	
	addAssertion: function (assertionValue,newId) {
        
		////var newText = assertionValue;
		w = assertionValue * 10;
        // Prepare to add shape to the graph.        
        var newText = new joint.shapes.basic.Text({
            position: { x: 170, y: 25 },
            size: { width: w, height: 22 },
            attrs: { text: { fill: '#F1C40F', rx: 20, ry: 20 }, text: { text: assertionValue } }
        });
     //
     // Add edId as a property to the graph element.
		newText.set('egId', newId);

        //Embedding (if someone knows a better way, be my guest to change this)
        //if(selection) selection.model.embed(newRectangle);
        if(selection) alert('Embedding assertions does not currently work!');
        // Add the assertion to the graph. 
        graph.addCells([newText]);
    },
	
    check_expression: function (thing_to_check) {
		
		//Error cases 1-7 as returned by the validator function
		if (controller.check_expression(thing_to_check) == "error1")
		{
			alert("ERROR::Invalid adjacent inputs");
		}
		else if (model.check_expression(thing_to_check) == "error2")
		{
			alert("ERROR::Invalid use of not");
		}
		else if (controller.check_expression(thing_to_check) == "error3")
		{
			alert("ERROR::Uneven letters or carrots");
		}
		else if (controller.check_expression(thing_to_check) == "error4")
		{
			alert("ERROR::Improper syntax");
		}
		else if (controller.check_expression(thing_to_check) == "error5")
		{
			alert("ERROR::Assertion must be between parenthesis");
		}
		else if (controller.check_expression(thing_to_check) == "error6")
		{
			alert("ERROR::Uneven brackets");
		}
		else if (controller.check_expression(thing_to_check) == "error7")
		{
			alert("ERROR::FAILED");
		}
		
		
		else
		{
			
		}
		
	},
// Clears the jointscript graph and informs the controller to clear as well.
	EGclear: function()
    {
        graph.clear();
        controller.EGclear();
    },
    
};






