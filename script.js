// Cortina + mostrar site
const btn = document.getElementById('openSiteBtn');
const curtain = document.getElementById('curtain');
const siteContent = document.getElementById('siteContent');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  curtain.classList.add('open'); // abre cortina
  setTimeout(() => {
    siteContent.classList.remove('hidden'); // mostra o conteúdo
  }, 1000); // timing combina com a animação
});

// Partículas interativas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => { 
  canvas.width = window.innerWidth; 
  canvas.height = window.innerHeight; 
  initParticles();
});

class Particle {
  constructor(x,y,dx,dy,size){
    this.x=x;
    this.y=y;
    this.directionX=dx;
    this.directionY=dy;
    this.size=size;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,255,102,0.7)' : 'rgba(0,68,255,0.7)';
    ctx.fill();
  }
  update(){
    if(this.x+this.size>canvas.width||this.x-this.size<0) this.directionX*=-1;
    if(this.y+this.size>canvas.height||this.y-this.size<0) this.directionY*=-1;
    this.x+=this.directionX;
    this.y+=this.directionY;
    this.draw();
  }
}

// Inicializa partículas
function initParticles(){
  particlesArray=[];
  for(let i=0;i<120;i++){
    let size=Math.random()*3+1;
    let x=Math.random()*canvas.width;
    let y=Math.random()*canvas.height;
    let dx=(Math.random()-0.5)*1.5;
    let dy=(Math.random()-0.5)*1.5;
    particlesArray.push(new Particle(x,y,dx,dy,size));
  }
}

// Animação partículas
function animateParticles(){ 
  requestAnimationFrame(animateParticles); 
  ctx.clearRect(0,0,canvas.width,canvas.height); 
  particlesArray.forEach(p=>p.update()); 
}

initParticles();
animateParticles();

// Efeito fade-in ao scroll
const fadeElements = document.querySelectorAll('.impact-section, .cards, section h2');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('fade-in');
    }
  });
},{threshold:0.2});

fadeElements.forEach(el=>observer.observe(el));
