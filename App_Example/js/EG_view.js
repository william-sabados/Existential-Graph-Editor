graph = new joint.dia.Graph;
var emptyX,emptyY;

// Change size of EG element.
graph.on('change:size', function (cell, newPosition, opt) {
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
graph.on('change:position', function (cell, newPosition, opt) {
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
});



function EG_View() {
    this.controller = null;
};

getNumParents = function (cell) {
    let numParents = 0;
    let parentId = cell.get('parent');
    if (parentId) numParents += 1 + getNumParents(graph.getCell(parentId));
    return numParents;
};

findSpace = function(width,height){
    let isOpen = false;
    let startX,startY,endX,endY,numParents;
    if(selection){
        startX = selection.model.prop('position/x');
        startY = selection.model.prop('position/y');
        endX = selection.model.prop('position/x') + selection.model.prop('size/width');
        endY = selection.model.prop('position/y') + selection.model.prop('size/height');
        numParents = getNumParents(selection.model) + 1;
    }else{
        startX = 0;
        startY = 0;
        endX = 1150;
        endY = 440;
        numParents = 0;
    }
    do{
        for (let i = startY; i < endY - height - 15; i += 5) {
            for (let j = startX; j < endX - width - 15; j += 5) {
                let modelsInArea = graph.findModelsInArea(new g.rect(j + 5, i + 5, width, height));
                if (modelsInArea.length == numParents) {
                    isOpen = true;
                    emptyX = j + 10;
                    emptyY = i + 10;
                    break;
                }
                else continue;
            }
            if (isOpen) break;
            else continue;
        }
        if (!isOpen && selection) {
            moveNeighbors(getTopParent(selection.model), 15, 15);
            changeParentSize(selection.model, 15, 15);
            endX = selection.model.prop('position/x') + selection.model.prop('size/width');
            endY = selection.model.prop('position/y') + selection.model.prop('size/height');
        }
    }while(!isOpen);
};

// Increases the size of each parent element, when needed
changeParentSize = function (cell, width, height) {
    if (cell.get('parent')){
        changeParentSize(graph.getCell(cell.get('parent')), width, height);
    }

    cell.prop('size/width', (cell.prop('size/width')) + width);
    cell.prop('size/height', (cell.prop('size/height')) + height);
};

// Returns the top parent of a given cell (recursively)
getTopParent = function (cell) {
    if (graph.getCell(cell.get('parent'))) return getTopParent(graph.getCell(cell.get('parent')));
    else return cell;
};

// Moves the neighbors of a given cell 
moveNeighbors = function(cell,width,height){
    // Get all cells and cycle through
    let allCells = graph.getCells();
    for(let i = 0; i < allCells.length; i++){
        if(!allCells[i].get('parent')){
            // Get top parent (and children of that parent) of current cell being checked
            let topParent = getTopParent(graph.getCell(allCells[i]));
            let children = topParent.get('embeds');
            // Find models to left and above, in case it needs to move (otherwise the other cells have space to move)
            let modelsLeft = graph.findModelsInArea(new g.rect(topParent.prop('position/x')-width,topParent.prop('position/y'),width,topParent.prop('size/height')));
            let modelsAbove = graph.findModelsInArea(new g.rect(topParent.prop('position/x'),topParent.prop('position/y')-height,topParent.prop('size/width'),height));
            // If the current cell's x is greater than the given cell's x plus width and it's on the same y level or more, move it and it's children to the right
            if(topParent.prop('position/x') >= cell.prop('position/x') + cell.prop('size/width') && topParent.prop('position/y') >= cell.prop('position/y')){
                // If it doesn't have anything left of it, don't move right
                if(modelsLeft.length > 0){
                    if(topParent.prop('position/x') + topParent.prop('size/width') + width > 1150){
                        let tempSelect = selection;
                        selection = null;
                        findSpace(topParent.prop('size/width'),topParent.prop('size/height'));
                        topParent.translate(emptyX-topParent.prop('position/x'),emptyY-topParent.prop('position/y'));
                        selection = tempSelect;
                    }else{
                        topParent.translate(width);
                    }
                }
            }
            // If the current cell's y is greater than the given cell's y plus height and it's on the same x column or more, move it and it's children down
            if(topParent.prop('position/y') >= cell.prop('position/y') + cell.prop('size/height') && topParent.prop('position/x') >= cell.prop('position/x')){
                // If it doesn't have anything above it, don't move down
                if(modelsAbove.length > 0){
                    if(topParent.prop('position/y') + topParent.prop('size/height') + height > 440){
                        let tempSelect = selection;
                        selection = null;
                        findSpace(topParent.prop('size/width'),topParent.prop('size/height'));
                        topParent.translate(emptyX-topParent.prop('position/x'),emptyY-topParent.prop('position/y'));
                        selection = tempSelect;
                    }else{
                        topParent.translate(0,height);
                    }
                }
            }
        }
    }
};

//Returns the cell with the given egId
getCellById = function(id){
    let cell = null;
    let graphCells = graph.getCells();
    for(let i = 0; i < graphCells.length; i++){
        if(graphCells[i].prop('egId') == id) cell = paper.findViewByModel(graphCells[i]);
    }
    return cell;
};

//Moves a cell to the top left most position possible in increments given
moveTopLeft = function(cell,width,height){
    cell = getTopParent(cell);
    let childrenCells = cell.get('embeds');
    while(graph.findModelsInArea(new g.rect(cell.prop('position/x'),cell.prop('position/y')-height-5,cell.prop('size/width'),height)).length == 0 && cell.prop('position/y')-height > 5){
        if(cell.get('embeds')){
            for(let i = 0; i < childrenCells.length; i++){
                graph.get(childrenCells[i]).prop('position/y',graph.get(childrenCells[i]).prop('position/y')-height);
            }
        }
        cell.prop('position/y',cell.prop('position/y')-height);
    }
    while(graph.findModelsInArea(new g.rect(cell.prop('position/x')-width-5,cell.prop('position/y'),width,cell.prop('size/height'))).length == 0 && cell.prop('position/x')-width > 5){
        if(cell.get('embeds')){
            for(let i = 0; i < childrenCells.length; i++){
                graph.get(childrenCells[i]).prop('position/x',graph.get(childrenCells[i]).prop('position/x')-width);
            }
        }
        cell.prop('position/x',cell.prop('position/x')-width);
    }
};

// Member functions that are added to the View object.
EG_View.prototype = {

    // Sets a reference to the controller.
    setController: function (controller) {
        this.controller = controller;
    },

    // Adds a new assertion to the graph when the 'Add Assertion' button pressed.
    addNegativeContext: function (newId, nestId) {
        //If there's a nest id that's not 0 (the SA), set selection to it temporarily
        if(nestId != 0) selection = getCellById(nestId);
        //finds empty position
        findSpace(50,40);
        // Prepare to add shape to the graph.        
        var newRectangle = new joint.shapes.basic.Circle({
            position: { x: emptyX, y: emptyY },
            size: { width: 50, height: 40 },
            attrs: { circle: { fill: '#F1C40F', rx: 20, ry: 20 }}
        });
        
        // Add edId as a property to the graph element.
        newRectangle.set('egId', newId);

        //Embedding (if someone knows a better way, be my guest to change this)
        if (selection) selection.model.embed(newRectangle);

        // Tells whether the assertion is negative based on the parent
        newRectangle.set('isNegated', true)
        // If it has a parent, and the parent is negative, set this to positive (Only visual, need to talk to Matthew about controller and model interaction)
        if (newRectangle.get('parent') && graph.getCell(newRectangle.get('parent')).prop('isNegated')) newRectangle.set('isNegated', false);
        if (!newRectangle.get('isNegated')) newRectangle.prop('attrs/circle/fill', '#D3D3D3');

        // Add the assertion to the graph.    
        graph.addCells([newRectangle]);

        //Resize
        if(selection) getTopParent(selection.model).fitEmbeds({deep: true, padding: 15});

        removeSelection();
    },
	
	addAssertion: function (assertionValue,newId, nestId) {
        //If there's a nest id that's not 0 (the SA), set selection to it temporarily
        if(nestId != 0) selection = getCellById(nestId);
        //finds empty position
        findSpace(15,22);
        // Prepare to add shape to the graph.        
        var newText = new joint.shapes.basic.Text({
            position: { x: emptyX, y: emptyY },
            size: { width: 15, height: 22 },
            attrs: { text: { fill: '#000000', rx: 20, ry: 20, text: assertionValue } }
        });
        
        // Add edId as a property to the graph element.
        newText.set('egId', newId);

        //Embedding
        if (selection) selection.model.embed(newText);

        // Add the assertion to the graph. 
        graph.addCells([newText]);

        //Resize
        if(selection) getTopParent(selection.model).fitEmbeds({deep: true, padding: 15});

        removeSelection();
    },

    check_expression: function (thing_to_check) {
        let i = 0;

        //Error cases 1-7 as returned by the validator function
        error = controller.check_expression(thing_to_check);
        if (error == "error1") {
            error_submit("ERROR::Invalid adjacent inputs", "console");
            error_submit("ERROR::Invalid adjacent inputs", "submit_error");
            document.getElementById("drawType").style.color = "red";
            //alert("ERROR::Invalid adjacent inputs");
            i = 1;
        }
        else if (error == "error2") {
            error_submit("ERROR::Invalid use of not", "console");
            error_submit("ERROR::Invalid use of not", "submit_error");
            document.getElementById("drawType").style.color = "red";
            //alert("ERROR::Invalid use of not");
            i = 1;
        }
        else if (error == "error3") {
            error_submit("ERROR::Uneven letters or carrots", "console");
            error_submit("ERROR::Uneven letters or carrots", "submit_error");
            document.getElementById("drawType").style.color = "red";
            //alert("ERROR::Uneven letters or carrots");
            i = 1;
        }
        else if (error == "error4") {
            error_submit("ERROR::Improper syntax", "console");
            error_submit("ERROR::Improper syntax", "submit_error");
            document.getElementById("drawType").style.color = "red";
            //alert("ERROR::Improper syntax");
            i = 1;
        }
        else if (error == "error5") {
            error_submit("ERROR::Assertion must be between parenthesis", "console");
            error_submit("ERROR::Assertion must be between parenthesis", "submit_error");
            document.getElementById("drawType").style.color = "red";
            //alert("ERROR::Assertion must be between parenthesis");
            i = 1;
        }
        else if (error == "error6") {
            error_submit("ERROR::Uneven brackets", "console");
            error_submit("ERROR::Uneven brackets", "submit_error");
            document.getElementById("drawType").style.color = "red";
            //alert("ERROR::Uneven brackets");
            i = 1;
        }
        else if (error == "error7") {
            error_submit("FAILED - - -", "console");
            error_submit("FAILED - - -", "submit_error");
            document.getElementById("drawType").style.color = "red";
            //alert("ERROR::FAILED");
            i = 1;
        }
        else {
            document.getElementById("drawType").style.color = "green";
            return error;
        }
    },

    // Clears the jointscript graph and informs the controller to clear as well.
    EGclear: function () {
        graph.clear();
        controller.EGclear();
        if (selection) selection.unhighlight();
        selection = null;
    },

    removeCell: function () {
        let childrenCells = selection.model.getEmbeddedCells({ deep: true })
        if (childrenCells.length > 0) {
            for (let i = 0; i < childrenCells.length; i++) {
                childrenCells[i].remove();
            }
        }
        let parentCell = graph.getCell(selection.model.get('parent'));
        selection.model.remove();
        if(parentCell) getTopParent(parentCell).fitEmbeds({deep: true, padding: 15});
        removeSelection();
    },
};
