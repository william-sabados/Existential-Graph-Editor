
function drawCircle(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(100, 75, 25, 0, 2 * Math.PI);
    ctx.stroke();

}

function clearArea() {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return false;
}

function drawEllipse(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.ellipse(100, 100, 50, 80, 90 * Math.PI/180, 0, 2 * Math.PI);
    ctx.stroke();

}

function drawP(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.font = "24px serif";
    ctx.fillText("p", 50, 100);
}

function drawQ(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.font = "24px serif";
    ctx.fillText("q", 50, 100);
}
function OnClickDraw() {
    var drawtype = $('#drawType').val().toLowerCase();
    var drawcommands = drawtype.split(',');
    for (var i = 0; i <= drawcommands.length - 1; i++) {
        var dc = drawcommands[i].toLowerCase();
        switch (dc) {
            case 'c':
                drawCircle();
                break;
            case 'e':
                drawEllipse();
                break;
            case 'p':
                drawP();
                break;
            case 'q':
                drawQ();
                break;
        }

    }
    return false;
}
