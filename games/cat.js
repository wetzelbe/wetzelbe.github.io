// Global vars
var catY = 0
var catDirection = 0
var obstacles = []
var frame = 0
var runnning = false
var canvasId = ""

const drawCat = (canvas, height) => {
  let ctx = canvas.getContext("2d");
  let startX = 30
  let startY = 300 - catY - 24
  
  ctx.fillStyle = "white"
  ctx.fillRect(startX, startY, 2, 2);
  ctx.fillRect(startX + 2, startY + 12, 16, 8);
  ctx.stroke();

}


const drawFrame = () => {
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

start()
