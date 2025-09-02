// Cortina
const curtain = document.getElementById('curtain');
const openBtn = document.getElementById('openSiteBtn');
const siteContent = document.getElementById('siteContent');

openBtn.addEventListener('click', () => {
  curtain.classList.add('open'); 
  setTimeout(() => {
    curtain.style.display = 'none'; 
    siteContent.classList.remove('hidden'); 
  }, 1000);
});

// Partículas da cortina
const canvas = document.getElementById('curtainParticles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

class Particle {
  constructor(x,y,dx,dy,size){ this.x=x; this.y=y; this.dx=dx; this.dy=dy; this.size=size; }
  draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fillStyle = 'rgba(0,255,128,0.7)'; ctx.fill(); }
  update(){
    if(this.x+this.size>canvas.width||this.x-this.size<0) this.dx*=-1;
    if(this.y+this.size>canvas.height||this.y-this.size<0) this.dy*=-1;
    this.x+=this.dx; this.y+=this.dy; this.draw();
  }
}

let particlesArray = [];
function initParticles(){
  particlesArray = [];
  for(let i=0;i<80;i++){
    let size=Math.random()*3+1;
    let x=Math.random()*canvas.width;
    let y=Math.random()*canvas.height;
    let dx=(Math.random()-0.5)*1.5;
    let dy=(Math.random()-0.5)*1.5;
    particlesArray.push(new Particle(x,y,dx,dy,size));
  }
}

function animateParticles(){
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>p.update());
}

initParticles();
animateParticles();
