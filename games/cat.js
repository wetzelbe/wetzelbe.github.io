// Global vars
var catY = 0
var catDirection = 0
var obstacles = []
var frame = 0
var runnning = false
var canvasId = "catgamecanvas"

const drawCat = (canvas, height, version) => {
  let ctx = canvas.getContext("2d");
  let startX = 30
  let startY = 300 - catY - 24
  
  ctx.fillStyle = "white"
  // Ears
  ctx.fillRect(startX + 8, startY, 2, 2);
  ctx.fillRect(startX + 18, startY, 2, 2);
  
  // Head
  ctx.fillRect(startX + 8, startY + 2, 4, 8);
  ctx.fillRect(startX + 16, startY + 2, 4, 8);
  ctx.fillRect(startX + 12, startY + 4, 4, 6);
  
  // Legs
  ctx.fillRect(startX + 2, startY + 20, 6, 2);
  ctx.fillRect(startX + 12, startY + 20, 2, 2);
  ctx.fillRect(startX + 16, startY + 20, 2, 2);
  
  // Body
  ctx.fillRect(startX + 2, startY + 12, 16, 8);

}


const drawFrame = () => {
  canvas = document.getElementById(canvasId)
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
