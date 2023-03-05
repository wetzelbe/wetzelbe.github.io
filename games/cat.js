// Global vars
var catY = 0
var catDirection = 0
var obstacles = []
var frame = 0
var runnning = false
var canvasId = ""

function drawCat(canvas, height)
{
  var ctx = canvas.getContext("2d");
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 100);
  ctx.stroke();

}


function drawFrame()
{
  canvas = document.getElementbyId(canvasId)
  drawCat(canvas, catY)
  

  
}


const doPhysics = () => {
}


const tick = () => {
  if (running)
  {
    doPhysics()
    drawFrame()
    setTimeout(tick, 50)
  }
}

const start = () => {
  running = true
  tick()
  
}
