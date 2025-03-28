// Global vars
var catY = 0
const catX = 30
var catDirection = 0
var obstacles = []
var frame = 0
var runnning = false
var canvasId = "catgamecanvas"
var jumpQueued = false
var delta = 10
var distanceToLastObstacle = 0
var distanceBetweenObstacles = 0

const drawCat = (ctx, height, version) => {
  let startX = catX
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

const drawObstacles = (ctx) => {
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, 300 - obstacle.height, obstacle.width, obstacle.height)
  })
}

const drawScore = (ctx, x, y) => {
  ctx.font = "15px monospace"
  ctx.fillText(frame, x,y)
}

const drawFrame = () => {
  frame = frame + 1
  canvas = document.getElementById(canvasId)
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0,0, canvas.width, canvas.height)
  version = Math.round(frame / 4)
  version = version % 2
  drawCat(ctx, catY, version)
  drawObstacles(ctx)
  drawScore(ctx, 30, 20)
  
}

const detectCollisions = () => {
  collision = false
  obstacles.forEach(obstacle => {
    // Detect Collisions in current Frame
    if ((obstacle.x <= catX && obstacle.x + obstacle.width >= catX && catY < obstacle.height)
       || (obstacle.x <= catX && obstacle.x + obstacle.width + (5 + Math.round(frame/150)) >= catX && catY < obstacle.height ) // Detect Collisions between frames
       || (obstacle.x <= catX + 20 && obstacle.x + obstacle.width >= catX + 20 && catY < obstacle.height)
       || (obstacle.x <= catX + 20 && obstacle.x + obstacle.width + (5 + Math.round(frame/150)) >= catX + 20 && catY < obstacle.height )) { // Detect Collisions between frames
      collision = true
    }
    
  })
  return collision
}

const doPhysics = () => {
  // Cat Jumps
  if (frame % 2 == 0){
  if (catY == 0 && jumpQueued)
  {
    catDirection = 1
    delta = 36
    catY = catY + delta
    jumpQueued = false
  }
  else if (catDirection == 1)
  {
    delta = delta - 4
    catY = catY + delta
    if (catY > 179)
    {
      catDirection = -1
      delta = 0
    }
  }
  else if (catDirection == -1)
  {
    delta = delta + 4
    catY = catY - delta
    if (catY <= 0)
    {
      catY = 0
      catDirection = 0
    }
  }
  }
  
  if (obstacles.length > 0 && obstacles[0].x + obstacles[0].width < 0)
  {
    obstacles.shift()
  }
  
  // Obstacles
  obstacles.forEach(obstacle => {
    obstacle.x = obstacle.x - (5 + Math.round(frame/300))
  })

  distanceToLastObstacle += (5 + Math.round(frame/300))
  
}

const addObstacle = (height, width) => {
  obstacles.push({
    x: 600,
    height: height,
    width: width
  })
}

const tick = () => {
  if (running)
  {
    doPhysics()
    
    if (detectCollisions())
    {
      running = false
      drawFrame()
    }
    else
    {
      drawFrame()
      let minDistance = 200
      if (frame/30 > minDistance){
        minDistance = frame/30
      }
    
      if (distanceToLastObstacle > distanceBetweenObstacles)
      {
        addObstacle(Math.round(Math.random() * 100) + 2, Math.round(Math.random() * 30) + 2)
        distanceToLastObstacle = 0
        distanceBetweenObstacles = Math.random() * 500 + minDistance 
      }
    
      setTimeout(tick, 25)
    }
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
  document.getElementById(canvasId).addEventListener("touchstart", () => {
    if (!jumpQueued)
    {
      jumpQueued = true
    }
  });
}

start()
