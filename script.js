// १. संगीत ऑन/ऑफ लॉजिक
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicBtn2 = document.getElementById('musicBtn2');
const musicText = document.getElementById('musicText');
const musicIcon = document.getElementById('musicIcon');

function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play().then(() => {
      if (musicText) musicText.textContent = 'संगीत बंद करा';
      if (musicIcon) musicIcon.textContent = '❚❚';
      if (musicBtn2) musicBtn2.textContent = '❚❚ वेबसाइटवरील संगीत बंद करा';
    }).catch(e => console.log('Music play error:', e));
  } else {
    music.pause();
    if (musicText) musicText.textContent = 'संगीत सुरू करा';
    if (musicIcon) musicIcon.textContent = '♫';
    if (musicBtn2) musicBtn2.textContent = '♫ वेबसाइटवर संगीत वाजवा';
  }
}

if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
if (musicBtn2) musicBtn2.addEventListener('click', toggleMusic);

// २. पडदा उघडण्याचे (Curtain Opening) लॉजिक (Laptop & Mobile Compatible)
const openCurtainBtn = document.getElementById('openCurtainBtn');
const curtainOverlay = document.getElementById('curtainOverlay');

function handleCurtainOpen(e) {
  if (e) e.preventDefault();
  
  if (curtainOverlay) {
    curtainOverlay.classList.add('open');
  }

  // संगीत सुरू करणे
  if (typeof music !== 'undefined' && music && music.paused) {
    music.play().then(() => {
      if (typeof musicText !== 'undefined' && musicText) musicText.textContent = 'संगीत बंद करा';
      if (typeof musicIcon !== 'undefined' && musicIcon) musicIcon.textContent = '❚❚';
      if (typeof musicBtn2 !== 'undefined' && musicBtn2) musicBtn2.textContent = '❚❚ वेबसाइटवरील संगीत बंद करा';
    }).catch(err => console.log('Autoplay blocked:', err));
  }

  // १.८ सेकंदानंतर पडदा लपवणे
  setTimeout(() => {
    if (curtainOverlay) curtainOverlay.style.display = 'none';
  }, 1800);
}

if (openCurtainBtn) {
  openCurtainBtn.addEventListener('click', handleCurtainOpen);
}

// ३. व्हॉट्सॲप शेअरिंग
const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
  whatsappBtn.addEventListener('click', () => {
    const currentUrl = window.location.href;
    const shareText = `*गोठणकरांचा महाराजा — गणपती उत्सव २०२६* 🌺\n\nगोठणकर परिवार आपणास व आपल्या परिवारास गणेशोत्सवासाठी सस्नेह आमंत्रित करीत आहे. 🙏\n\nसविस्तर निमंत्रण आणि माहिती पाहण्यासाठी खालील लिंकवर क्लिक करा:\n${currentUrl}`;
    const wpUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(wpUrl, '_blank');
  });
}

// ४. काऊंटडाउन टायमर
const target = new Date('2026-09-14T10:30:00+05:30').getTime();
function updateCountdown() {
  let diff = target - Date.now();
  const msg = document.getElementById('countdownMessage');
  if (diff <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
    if (msg) msg.textContent = '🎉 बाप्पाचे आगमन झाले! गणपती बाप्पा मोरया! 🙏';
    return;
  }
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); diff %= 60000;
  const s = Math.floor(diff / 1000);

  if (document.getElementById('days')) document.getElementById('days').textContent = String(d).padStart(2, '0');
  if (document.getElementById('hours')) document.getElementById('hours').textContent = String(h).padStart(2, '0');
  if (document.getElementById('minutes')) document.getElementById('minutes').textContent = String(m).padStart(2, '0');
  if (document.getElementById('seconds')) document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ५. फुलांचा वर्षाव इफेक्ट
const entryFlowers = document.getElementById('entryFlowers');
function makeFlower() {
  if (!entryFlowers) return;
  const p = document.createElement('span');
  p.className = 'flower';
  p.textContent = Math.random() > 0.5 ? '🌼' : '🌸';
  p.style.left = Math.random() * 100 + '%';
  p.style.setProperty('--x', (Math.random() * 180 - 90) + 'px');
  p.style.animationDelay = (Math.random() * 0.8) + 's';
  entryFlowers.appendChild(p);
  setTimeout(() => p.remove(), 5500);
}
setInterval(makeFlower, 350);

// ६. फोटो लाईटबॉक्स
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    if (lightboxImg && lightbox) {
      lightboxImg.src = item.dataset.img;
      lightbox.classList.add('show');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  });
});

function closeLightbox() {
  if (lightbox && lightboxImg) {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }
}

const closeBtn = document.getElementById('closeLightbox');
if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});