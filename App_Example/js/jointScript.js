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
    let egId2 = target.prop('egId');
    let obj = model.model.returnTermByID(egId1, 0);
    obj.copy(egId2);
}

// On cell click
paper.on('cell:pointerdown',function(cellView,evt,x,y){
    if(copying){
        copy(selection.model,cellView.model);
        copying = false;
    }
    /*
    if(copying && selection != cellView){
        let cellCopy = selection.model.clone({ deep: true });
        let valid = false;
        if (cellView.model.prop('isNegated')){
            valid = true;
        }

        if(valid){
            cellCopy.forEach(function(item,index,array){
                cellCopy[index].prop('egId',controller.incrementId());
            });
            if(cellCopy[0].get('parent')) graph.getCell(cellCopy[0].get('parent')).unembed(cellCopy[0]);
            graph.addCell(cellCopy);
            cellCopy[0].translate(x-cellCopy[0].prop('position/x'),y-cellCopy[0].prop('position/y'));
            cellView.model.embed(cellCopy[0]);
            //cellView.model.fitEmbeds();
            getTopParent(cellView.model).fitEmbeds({deep: true, padding: 15});
            //cellCopy[0].toFront({ deep: true });
        }else{
            alert('Not a valid place to copy to.');
        }
        copying = false;
    }*/

    // If there's already something selected, unhighlight it
    allCells = graph.getCells();
    allCells.forEach(function(item,index,array){
        paper.findViewByModel(allCells[index]).unhighlight();
    });
    //if(selection) selection.unhighlight();
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