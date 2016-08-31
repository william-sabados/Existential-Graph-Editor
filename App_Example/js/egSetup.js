// PREVIOUSLY JOINTSCRIPT.JS
// This line needs to be called after the myholder div tag is declared.
var graphWidth = (screen.width / 100) * 72.4;
var paper = new joint.dia.Paper({ el: $('#myholder'), stroke: 1, width: graphWidth, height: 475, gridSize: 1, model: graph });
var selection;
var copying;
var prevMouseX = 0;
var prevMouseY = 0;
var resizing = false;

// Returns the egId of whatever is selected
getSelectionEgId = function(){
    if(selection) return (selection.model.prop('egId'));
    else return 0;
};

copy = function(source, target){
    let egId1 = source.prop('egId');
    let egId2;
    if(target == 0) egId2 = 0;
    else egId2 = target.prop('egId');
    let obj = model.model.returnTermByID(egId1, 0);
    return obj.copy(egId2, 1);
};

highlightCell = function(cell){
    cell.highlight();
    if(cell.model.prop('attrs/circle')) cell.model.prop('attrs/circle/stroke','#FFFFFF');
};

unhighlightCell = function(cell){
    cell.unhighlight();
    if(cell.model.prop('attrs/circle')) cell.model.prop('attrs/circle/stroke','#000000');
}

// On cell click
paper.on('cell:pointerdown',function(cellView,evt,x,y){
    if(copying){
        if(!cellView.model.prop('attrs/text/text')){
            if(copy(selection.model,cellView.model)) addUndo();
        }else{
            error_submit('ERROR::Invalid copy target','submit_error');
            error_submit('ERROR::Invalid copy target','console');
        }
        copying = false;
    }
    
    // Unhighlight everything
    allCells = graph.getCells();
    allCells.forEach(function(item,index,array){
        unhighlightCell(paper.findViewByModel(allCells[index]));
    });
    // Select the cell the user is clicking on
    selection = cellView;
    //Enable/disable buttons according to selection 
    disableButtons();
    //Bring cell to front
    selection.model.toFront({ deep: true });
    // Highlight the selection
    highlightCell(selection);
    prevMouseX = x;
    prevMouseY = y;
});

paper.on('cell:pointerup',function(cellView,evt,x,y){
    resizing = false;
});

/* Resizing */
paper.on('cell:pointermove',function(cellView,evt,x,y){
    if(cellView == selection && resizing && !cellView.model.prop('attrs/text/text')){
        if(cellView.model.prop('size/width') + (x-prevMouseX) > 0 && cellView.model.prop('size/height') + (y-prevMouseY) > 0){
            cellView.model.resize(cellView.model.prop('size/width') + (x-prevMouseX),cellView.model.prop('size/height') + (y-prevMouseY));
        }
        cellView.model.translate(prevMouseX-x,prevMouseY-y);
        prevMouseX = x;
        prevMouseY = y;
    }
});


// On click in a blank area
paper.on('blank:pointerdown',function(evt,x,y){
    if(copying) copying = false;
    removeSelection();
});

removeSelection = function(){
    if(selection) unhighlightCell(selection);
    selection = null;
    disableButtons();
    resizing = false;
};

getCellModel = function(id){
    return graph.getCell(id);
};

getCellModelFromEgId = function(id){
    let allCells = graph.getCells();
    let cell;
    allCells.forEach(function(value){
        if(graph.getCell(value).prop('egId') == id) cell = value;
    });
    return cell;
};