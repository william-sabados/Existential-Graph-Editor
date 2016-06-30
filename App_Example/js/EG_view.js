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

//A function that picks an empty playce to find assertion
findSpace= function(){
        var isOpen = false;
        while(!isOpen){
            for(i=10; i<1174; i++){
                for(j=10; j<475; j ++){
                    var modelIsInArea = graph.findModelsInArea(new g.rect(j-5, i-5, 60, 50));
                    if(modelIsInArea.length == 0)
                    {
                        isOpen=true;
                        emptyX = j;
                        emptyY = i;
                        break;
                    }
                    else continue;
                }
                break;
            }
        }
    };

// Member functions that are added to the View object.
EG_View.prototype = {
    
    // Sets a reference to the controller.
    setController: function (controller) {
        this.controller = controller;
    },
    
    // Adds a new assertion to the graph when the 'Add Assertion' button pressed.
    addNegatedAssertion: function (assertionValue) {
        //finds a place to insert the new assertion
        findSpace(); 

        // Prepare to add shape to the graph.      
        var newRectangle = new joint.shapes.basic.Circle({
            position: { x: emptyX, y: emptyY },
            size: { width: 50, height: 40 },
            attrs: { circle: { fill: '#F1C40F', rx: 20, ry: 20 }, text: { text: assertionValue } }
        });

        // Notify controller that a new assertion is being added.
        // Get the existential graph (eg) id in return. 
        var egId = controller.addNegatedAssertion(assertionValue);

        // Add edId as a property to the graph element.
        newRectangle.set('egId', egId);
        
        // Add the assertion to the graph.    
        graph.addCells([newRectangle]);
    },
	
	addAssertion: function (assertionValue) {
        
		////var newText = assertionValue;

        //finds a place to insert the new assertion
		findSpace();

        // Prepare to add shape to the graph.        
        var newText = new joint.shapes.basic.Text({
            position: { x: emptyX, y: emptyY },
            size: { width: 15, height: 22 },
            attrs: { text: { fill: '#F1C40F', rx: 20, ry: 20 }, text: { text: assertionValue } }
        });
        
        // Notify controller that a new assertion is being added.
        // Get the existential graph (eg) id in return. 
        var egId = controller.addAssertion(assertionValue);

        // Add edId as a property to the graph element.
		newText.set('egId', egId);

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
		
	}
	
    
};






