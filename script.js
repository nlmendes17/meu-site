const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = { x:null, y:null, radius: 100 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor(x,y,directionX,directionY,size){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false);
    ctx.fillStyle = 'rgba(106,17,203,0.7)';
    ctx.fill();
  }
  update(){
    if(this.x + this.size > canvas.width || this.x - this.size < 0){
      this.directionX = -this.directionX;
    }
    if(this.y + this.size > canvas.height || this.y - this.size < 0){
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    // Conecta partículas
    for(let i=0;i<particlesArray.length;i++){
      let dx = this.x - particlesArray[i].x;
      let dy = this.y - particlesArray[i].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < 120){
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(106,17,203,0.1)';
        ctx.lineWidth = 1;
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(particlesArray[i].x,particlesArray[i].y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    this.draw();
  }
}

function init(){
  particlesArray = [];
  for(let i=0;i<100;i++){
    let size = Math.random()*4 +1;
    let x = Math.random()*(canvas.width-size*2)+size;
    let y = Math.random()*(canvas.height-size*2)+size;
    let directionX = (Math.random()-0.5)*1;
    let directionY = (Math.random()-0.5)*1;
    particlesArray.push(new Particle(x,y,directionX,directionY,size));
  }
}
function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => p.update());
}
init();
animate();
