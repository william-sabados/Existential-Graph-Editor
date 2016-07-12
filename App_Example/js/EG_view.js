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
        var parentId = cell.get('parent');
        if (!parentId) return;

        var parent = graph.getCell(parentId);
        var parentBbox = parent.getBBox();
        var cellBbox = cell.getBBox();

        if (parentBbox.containsPoint(cellBbox.origin()) &&
            parentBbox.containsPoint(cellBbox.topRight()) &&
            parentBbox.containsPoint(cellBbox.corner()) &&
            parentBbox.containsPoint(cellBbox.bottomLeft())) {

            // All the four corners of the child are inside
            // the parent area.
            return;
        }

        // Revert the child position.
        cell.set('position', cell.previous('position'));
/*
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

        */
    });



function EG_View() { 
   this.controller = null;

    
};

getNumParents = function(cell){
    let numParents = 0;
    let parentId = cell.get('parent');
    if(parentId) numParents += 1 + getNumParents(graph.getCell(parentId));
    return numParents;
};

//A function that picks an empty playce to find assertion
findSpace= function(){
        var isOpen = false;
        while(!isOpen){
            if(selection){
                for(i=0; i<selection.model.prop('size/height')-55; i+=5){
                    for(j=0; j<selection.model.prop('size/width')-65; j+=5){
                        var modelIsInArea = graph.findModelsInArea(new g.rect(selection.model.prop('position/x')+j+5, selection.model.prop('position/y')+i+5, 40, 30));
                        if(modelIsInArea.length == getNumParents(selection.model)+1){
                            isOpen=true;
                            emptyX = selection.model.prop('position/x')+j+10;
                            emptyY = selection.model.prop('position/y')+i+10;
                            break;
                        }
                        else continue;
                    }
                    if(isOpen) break;
                    else continue;
                }
                if(!isOpen){
                    moveNeighbors(selection.model,10,10);
                    changeParentSize(selection.model,10,10);
                }
            }else{
                for(i=10; i<440; i++){
                    for(j=10; j<950; j++){
                        var modelIsInArea = graph.findModelsInArea(new g.rect(j-5, i-5, 60, 50));
                        if(modelIsInArea.length == 0){
                            isOpen=true;
                            emptyX = j;
                            emptyY = i;
                            break;
                        }
                        else continue;
                    }
                    if(isOpen) break;
                    else continue;
                }
            }
        }
    };

    // Returns true if there is space inside cell to place a new assertion
    isSpace = function(cell){
        let spaceAvail = false;
        for(k=0; k<cell.prop('size/height')-65; k+=5){
            for(l=0; l<cell.prop('size/width')-55; l+=5){
                // Cycle through x and y (k and l)
                let modelsInArea = graph.findModelsInArea(new g.rect(cell.prop('position/x')+l+5, cell.prop('position/y')+k+5, 60, 50));
                if(modelsInArea.length == getNumParents(cell) + 1){
                    // If there is "empty space" set space available to true
                    spaceAvail = true;
                    break;
                }
                else continue;
            }
            if(spaceAvail) break;
            else continue;
        }
        // Return whether there is or is not space
        return spaceAvail;
    }

    // Changes the size of each parent element, if needed
    changeParentSize = function(cell,width,height){
        if(cell.get('parent') && !isSpace(graph.getCell(cell.get('parent')))){
            changeParentSize(graph.getCell(cell.get('parent')),10,10);
        }

        cell.prop('size/width',(cell.prop('size/width')) + width);
        cell.prop('size/height',(cell.prop('size/height')) + height);
    };

    // Returns the top parent of a given cell (recursively)
    getTopParent = function(cell){
        if(graph.getCell(cell.get('parent'))) return getTopParent(graph.getCell(cell.get('parent')));
        else return cell;
    };

    // Moves all neighboring elements to the right and the bottom of the current cell right or down
    moveNeighbors = function(cell,width,height){
        let allCells = graph.getCells();
        for(i = 0; i < allCells.length; i++){
            let currCell = allCells[i];
            //if current cell x < x + width, move right
            if(cell.prop('position/x') + cell.prop('size/width') <= currCell.prop('position/x')){// && currCell.prop('position/y') >= getTopParent(cell).prop('position/y')-50){
                currCell.prop('position/x',currCell.prop('position/x')+width);
            }
            //if current cell y < y + height, move down
            if(cell.prop('position/y') + cell.prop('size/height') <= currCell.prop('position/y')){// && currCell.prop('position/x') >= getTopParent(cell).prop('position/x')-60){
                currCell.prop('position/y',currCell.prop('position/y')+height);
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
    // TODO:  Needs to pick and empty place to add the new assertion.  
    addNegatedAssertion: function (assertionValue,newId) {
        

        //finds empty position
        findSpace();

        // Prepare to add shape to the graph.        
        var newRectangle = new joint.shapes.basic.Circle({
            position: { x: emptyX, y: emptyY },
            size: { width: 50, height: 40 },
            attrs: { circle: { fill: '#F1C40F', rx: 20, ry: 20 }, text: { text: assertionValue } }
        });
        //
        // Add edId as a property to the graph element.
        newRectangle.set('egId', newId);

        //Embedding (if someone knows a better way, be my guest to change this)
        if(selection) selection.model.embed(newRectangle);

        // Tells whether the assertion is negative based on the parent
        newRectangle.set('isNegated',true)
        // If it has a parent, and the parent is negative, set this to positive (Only visual, need to talk to Matthew about controller and model interaction)
        if(newRectangle.get('parent') && graph.getCell(newRectangle.get('parent')).prop('isNegated')) newRectangle.set('isNegated',false);
        if(!newRectangle.get('isNegated')) newRectangle.prop('attrs/circle/fill','#D3D3D3');

        // Add the assertion to the graph.    
        graph.addCells([newRectangle]);
    },
	
	addAssertion: function (assertionValue,newId) {
        
		////var newText = assertionValue;
		
        //finds empty position
        findSpace();

        // Prepare to add shape to the graph.        
        var newText = new joint.shapes.basic.Text({
            position: { x: emptyX, y: emptyY },
            size: { width: 15, height: 22 },
            attrs: { text: { fill: '#000000', rx: 20, ry: 20, text: assertionValue } }
        });
     //
     // Add edId as a property to the graph element.
		newText.set('egId', newId);

        //Embedding (if someone knows a better way, be my guest to change this)
        if(selection) selection.model.embed(newText);
        //if(selection) alert('Embedding assertions does not currently work!');
        // Add the assertion to the graph. 
        graph.addCells([newText]);
    },
	
    check_expression: function (thing_to_check) {
		var i = 0;
		
		//Error cases 1-7 as returned by the validator function
        error = controller.check_expression(thing_to_check);
		if (error == "error1")
		{
			throwError("ERROR::Invalid adjacent inputs");
			error_submit("ERROR::Invalid adjacent inputs");
			document.getElementById("drawType").style.color="red";
			//alert("ERROR::Invalid adjacent inputs");
			i = 1;
		}
		else if (error == "error2")
		{
			throwError("ERROR::Invalid use of not");
			error_submit("ERROR::Invalid use of not");
			document.getElementById("drawType").style.color="red";
			//alert("ERROR::Invalid use of not");
			i = 1;
		}
		else if (error == "error3")
		{
			throwError("ERROR::Uneven letters or carrots");
			error_submit("ERROR::Uneven letters or carrots");
			document.getElementById("drawType").style.color="red";
			//alert("ERROR::Uneven letters or carrots");
			i = 1;
		}
		else if (error == "error4")
		{
			throwError("ERROR::Improper syntax");
			error_submit("ERROR::Improper syntax");
			document.getElementById("drawType").style.color="red";
			//alert("ERROR::Improper syntax");
			i = 1;
		}
		else if (error == "error5")
		{
			throwError("ERROR::Assertion must be between parenthesis");
			error_submit("ERROR::Assertion must be between parenthesis");
			document.getElementById("drawType").style.color="red";
			//alert("ERROR::Assertion must be between parenthesis");
			i = 1;
		}
		else if (error == "error6")
		{
			throwError("ERROR::Uneven brackets");
			error_submit("ERROR::Uneven brackets");
			document.getElementById("drawType").style.color="red";
			//alert("ERROR::Uneven brackets");
			i = 1;
		}
		else if (error == "error7")
		{
			throwError("FAILED - - -");
			error_submit("FAILED - - -");
			document.getElementById("drawType").style.color="red";
			//alert("ERROR::FAILED");
			i = 1;
		}
		//if (i = 1) {document.getElementById("drawType").style.color="black";}
		else
		{
            document.getElementById("drawType").style.color="green";
			return error;
		}
		
	},
// Clears the jointscript graph and informs the controller to clear as well.
	EGclear: function()
    {
        graph.clear();
        controller.EGclear();
        if(selection) selection.unhighlight();
        selection = null;
    },
    
};






