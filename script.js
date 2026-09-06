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
    alert('कृपया ganpati-aale.mp3 फाईल upload झाली आहे का ते तपासा.');
  }
}
musicBtn.addEventListener('click',toggleMusic);
if(musicBtn2) musicBtn2.addEventListener('click',toggleMusic);

// व्हॉट्सॲप डायरेक्ट शेअरिंग
const whatsappBtn = document.getElementById('whatsappBtn');
if(whatsappBtn){
  whatsappBtn.addEventListener('click', () => {
    const currentUrl = window.location.href;
    const shareText = `*गोठणकरांचा राजा — गणपती उत्सव २०२६* 🌺\n\nगोठणकर परिवार आपणास व आपल्या परिवारास गणेशोत्सवासाठी सस्नेह आमंत्रित करीत आहे. 🙏\n\nसविस्तर निमंत्रण आणि माहिती पाहण्यासाठी खालील लिंकवर क्लिक करा:\n${currentUrl}`;
    const wpUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(wpUrl, '_blank');
  });
}

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

const entryFlowers=document.getElementById('entryFlowers');
function makeFlower(){
  if(!entryFlowers) return;
  const p=document.createElement('span');
  p.className='flower';
  p.textContent=Math.random()>.5?'🌼':'🌸';
  p.style.left=Math.random()*100+'%';
  p.style.setProperty('--x',(Math.random()*180-90)+'px');
  p.style.animationDelay=(Math.random()*.8)+'s';
  entryFlowers.appendChild(p);
  setTimeout(()=>p.remove(),5500);
}
setInterval(makeFlower,350);

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