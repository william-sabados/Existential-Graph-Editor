function drawCircle(){
   var canvas = document.getElementById("myCanvas");
   var radius = document.getElementById("getRadius").value;
   var ctx = canvas.getContext("2d");
   
   ctx.beginPath();
   ctx.arc(100, 75, radius, 0, 2 * Math.PI);
   ctx.stroke();
 }

 function clearArea() {
 	var canvas = document.getElementById("myCanvas");
 	var ctx = canvas.getContext("2d");
 	ctx.clearRect(0, 0, canvas.width, canvas.height);
 }

function drawEllipse(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.ellipse(100, 100, 50, 75, 45 * Math.PI/180, 0, 2 * Math.PI);
    ctx.stroke();

}

function drawP(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.font = "48px serif";
    ctx.fillText("P", 50, 100);
}

function drawQ(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.font = "48px serif";
    ctx.fillText("Q", 50, 100);
}