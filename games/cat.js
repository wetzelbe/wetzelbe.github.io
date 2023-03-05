// Global vars
var catY = 0
var catDirection = 0
var obstacles = []
var frame = 0
var runnning = false
var canvasId = "catgamecanvas"
var jumpQueued = false

const drawCat = (ctx, height, version) => {
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
  ctx.fillRect(startX + 4, startY + 20, 2, 2);
  
  // Body
  ctx.fillRect(startX + 2, startY + 12, 16, 8);
  
  // Tail
  ctx.fillRect(startX, startY + 12, 2, 4)
  ctx.fillRect(startX-2, startY + 14, 2, 6)
  ctx.fillRect(startX - 6, startY + 20, 4, 2);
  
  if (version == 1 || catY != 0)
  {
    // Legs
    ctx.fillRect(startX + 12, startY + 22, 2, 2);
    ctx.fillRect(startX + 16, startY + 22, 2, 2);
    ctx.fillRect(startX + 2, startY + 22, 2, 2);
    
    // Tail
    ctx.fillRect(startX - 2, startY + 20, 2, 2);
  }
  else 
  {
    // Legs
    ctx.fillRect(startX + 14, startY + 22, 2, 2);
    ctx.fillRect(startX + 18, startY + 22, 2, 2);
    ctx.fillRect(startX, startY + 22, 2, 2);
    
    // Tail
    ctx.fillRect(startX - 8, startY + 18, 2, 2);
  }
  
}


const drawFrame = () => {
  frame = frame + 1
  canvas = document.getElementById(canvasId)
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0,0, canvas.width, canvas.height)
  version = Math.round(frame / 4)
  version = version % 2
  drawCat(ctx, catY, version)
  
}


const doPhysics = () => {
  if (catY == 0 && jumpQueued)
  {
    catDirection = 1
    catY = catY + 10
  }
  else if (catDirection == 1)
  {
    catY = catY + (150*150 - catY*catY)/ 100
    if (catY > 150)
    {
      catDirection = -1
    }
  }
  else if (catDirection == -1)
  {
    catY = catY - (150*150 - catY*catY)/ 100
    if (catY <= 0)
    {
      catY = 0
      catDirection = 0
      jumpQueued = false
    }
  }
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
  document.addEventListener('keydown', (event) => {
    if (event.code == "Space" && !jumpQueued)
    {
      jumpQueued = true
    }
  }, false);
  
}

start()
