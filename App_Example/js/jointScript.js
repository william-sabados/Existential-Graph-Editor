// This line needs to be called after the myholder div tag is declared.
var graphWidth = (screen.width / 100) * 72.4;
var paper = new joint.dia.Paper({ el: $('#myholder'), stroke: 1, width: graphWidth, height: 475, gridSize: 1, model: graph });
var selection;
var prevMouseX = 0;
var prevMouseY = 0;
var resizing = false;

// Returns the egId of whatever is selected
getSelectionEgId = function(){
    if(selection) return (selection.model.prop('egId'));
    else return 0;
};

// On cell click
paper.on('cell:pointerdown',function(cellView,evt,x,y){
    // If there's already something selected, unhighlight it
    if(selection) selection.unhighlight();
    // Select the cell the user is clicking on
    selection = cellView;
    //Bring cell to front
    selection.model.toFront({ deep: true });
    // Highlight the selection
    selection.highlight();
    prevMouseX = x;
    prevMouseY = y;
});

/* Resizing, but need to figure out how to prevent position change (drag to resize and to move, at the moment)
paper.on('cell:pointermove',function(cellView,evt,x,y){
    if(cellView == selection){
        if(cellView.model.prop('size/width') + (x-prevMouseX) > 0 && cellView.model.prop('size/height') + (y-prevMouseY) > 0)
        cellView.model.resize(cellView.model.prop('size/width') + (x-prevMouseX),cellView.model.prop('size/height') + (y-prevMouseY));
        prevMouseX = x;
        prevMouseY = y;
        resizing = true;
    }
});
*/

// On click in a blank area
paper.on('blank:pointerdown',function(evt,x,y){
    if(selection) selection.unhighlight();
    selection = null;
});

removeSelection = function(){
    if(selection){
        selection.unhighlight();
        selection = null;
    }
};