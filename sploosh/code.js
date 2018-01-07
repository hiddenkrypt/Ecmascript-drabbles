(function() {
  var requestAnimationFrame =
    window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    window.requestAnimationFrame = requestAnimationFrame
})()

var WIDTH = 300,
  HEIGHT = 200,
  GRAVITY = .98,
  WIND = .05,
  BOUNCE = .6,
  AIR_FRICTION = .99,
  LOGIC_UPDATE_RATE = 30,
  canvas = {},
  ctx = {},
  particleSize = 3,
  particleCount = 200,
  spawnRateLimit = 2,
  bounceLimit = 4,
  sourceX = 2,
  sourceY = 50,
  impulseX = 10,
  impulseY = 10,
  formX = -1.5,
  formY = -.5,
  ctx,
  particles=[]

function init(){
  canvas = document.getElementById( 'c' )
  ctx = canvas.getContext( "2d" )
  canvas.style.width = canvas.width = WIDTH
  canvas.style.height = canvas.height = HEIGHT
  setInterval( logicUpdate, 1000/LOGIC_UPDATE_RATE )
  renderUpdate()
}
window.onload = init

function renderUpdate(){
  ctx.fillStyle = "black"
  ctx.fillRect( 0, 0, WIDTH, HEIGHT )
  particles.forEach(function(particle){
    if( particle.bounced === 1){
      ctx.fillStyle = "#3333ff"
    } else if( particle.bounced > 1){
      ctx.fillStyle = "#0000ff"
    } else{
      ctx.fillStyle = "#aabbff"
    }
    ctx.fillRect(particle.x, particle.y, particleSize, particleSize)
  })
  requestAnimationFrame( renderUpdate )
}

function Particle(){
  this.x = sourceX
  this.y = sourceY
  this.dx = (Math.random()+formX)*impulseX
  this.dy = (Math.random()+formY)*impulseY
  this.bounced = 0
}

function logicUpdate(){
  particles.forEach(move)
  for( var i = 0; i < spawnRateLimit && particles.length < particleCount; i++ ){ //spawn new particles up to maximum particleCount
    particles.push( new Particle() )
  }
  particles = particles.filter(e=>{return !(e.y >= HEIGHT && e.bounced >= bounceLimit)}) //bounce limit culling
}

function move(particle){ //update particle location
  particle.x += particle.dx
  particle.y += particle.dy
  particle.dy+= GRAVITY
  particle.dx+= WIND
  particle.dx *= AIR_FRICTION
  if( (particle.y >= HEIGHT || particle.y <= 0) && particle.bounced < bounceLimit ){// floor/ceiling bounce
    particle.y -= particle.dy
    particle.dy = -particle.dy * BOUNCE
    particle.bounced++
  }
  if( particle.x >= WIDTH - particleSize || particle.x <= 0 ){ // wall bounce
    particle.dx = -particle.dx
  }
}
