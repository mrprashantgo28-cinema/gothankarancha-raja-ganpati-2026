const music=document.getElementById('bgMusic');
const musicBtn=document.getElementById('musicBtn');
const musicBtn2=document.getElementById('musicBtn2');
const musicText=document.getElementById('musicText');
const musicIcon=document.getElementById('musicIcon');

async function toggleMusic(){
  try{
    if(music.paused){
      await music.play();
      musicText.textContent='संगीत बंद करा';
      musicIcon.textContent='❚❚';
      if(musicBtn2) musicBtn2.textContent='❚❚ वेबसाइटवरील संगीत बंद करा';
    }else{
      music.pause();
      musicText.textContent='संगीत सुरू करा';
      musicIcon.textContent='♫';
      if(musicBtn2) musicBtn2.textContent='♫ वेबसाइटवर संगीत वाजवा';
    }
  }catch(e){
    alert('कृपया GitHub मध्ये ganpati-aale.mp3 फाईल upload झाली आहे का ते तपासा.');
  }
}
musicBtn.addEventListener('click',toggleMusic);
if(musicBtn2) musicBtn2.addEventListener('click',toggleMusic);

// Try to start the local Ganpati music when the page opens.
// Modern browsers may block audible autoplay; in that case the first tap/click
// anywhere on the page starts it automatically.
async function tryAutoMusic(){
  try{
    music.volume = 0.9;
    await music.play();
    musicText.textContent='संगीत बंद करा';
    musicIcon.textContent='❚❚';
    if(musicBtn2) musicBtn2.textContent='❚❚ वेबसाइटवरील संगीत बंद करा';
  }catch(e){
    // Browser autoplay policy blocked sound. Start on the first user gesture.
  }
}
window.addEventListener('load', tryAutoMusic);
['pointerdown','touchstart','keydown'].forEach(evt=>{
  document.addEventListener(evt, async ()=>{
    if(music.paused){
      try{
        await music.play();
        musicText.textContent='संगीत बंद करा';
        musicIcon.textContent='❚❚';
        if(musicBtn2) musicBtn2.textContent='❚❚ वेबसाइटवरील संगीत बंद करा';
      }catch(e){}
    }
  }, {once:true, passive:true});
});


const target=new Date('2026-09-14T10:30:00+05:30').getTime();
function updateCountdown(){
  let diff=target-Date.now();
  const msg=document.getElementById('countdownMessage');
  if(diff<=0){
    ['days','hours','minutes','seconds'].forEach(id=>document.getElementById(id).textContent='00');
    msg.textContent='🎉 बाप्पाचे आगमन झाले! गणपती बाप्पा मोरया! 🙏';
    return;
  }
  const d=Math.floor(diff/86400000); diff%=86400000;
  const h=Math.floor(diff/3600000); diff%=3600000;
  const m=Math.floor(diff/60000); diff%=60000;
  const s=Math.floor(diff/1000);
  document.getElementById('days').textContent=String(d).padStart(2,'0');
  document.getElementById('hours').textContent=String(h).padStart(2,'0');
  document.getElementById('minutes').textContent=String(m).padStart(2,'0');
  document.getElementById('seconds').textContent=String(s).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown,1000);

const petals=document.getElementById('petals');
const symbols=['🌼','🌸','✦','🪔'];
function makePetal(){
  const p=document.createElement('span');
  p.className='petal';
  p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
  p.style.left=Math.random()*100+'vw';
  p.style.setProperty('--drift',(Math.random()*220-110)+'px');
  p.style.animationDuration=(5+Math.random()*6)+'s';
  petals.appendChild(p);
  setTimeout(()=>p.remove(),12000);
}
setInterval(makePetal,900);

const entryFlowers=document.getElementById('entryFlowers');
function makeFlower(){
  const p=document.createElement('span');
  p.className='flower';
  p.textContent=Math.random()>.5?'🌼':'🌸';
  p.style.left=Math.random()*100+'%';
  p.style.setProperty('--x',(Math.random()*180-90)+'px');
  p.style.animationDelay=(Math.random()*.8)+'s';
  entryFlowers.appendChild(p);
  setTimeout(()=>p.remove(),5500);
}
setInterval(makeFlower,320);

const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click',()=>{
    lightboxImg.src=item.dataset.img;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  });
});
function closeLightbox(){
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src='';
}
document.getElementById('closeLightbox').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
