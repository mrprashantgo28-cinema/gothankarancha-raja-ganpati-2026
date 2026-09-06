const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");
const musicIcon = document.getElementById("musicIcon");

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicText.textContent = "संगीत बंद करा";
      musicIcon.textContent = "❚❚";
    } else {
      music.pause();
      musicText.textContent = "संगीत सुरू करा";
      musicIcon.textContent = "♫";
    }
  } catch (e) {
    musicText.textContent = "Music file तपासा";
  }
});

// Countdown: 14 September 2026, 10:30 AM IST.
const target = new Date("2026-09-14T10:30:00+05:30").getTime();
function updateCountdown(){
  const now = Date.now();
  let diff = target - now;
  const msg = document.getElementById("countdownMessage");
  if(diff <= 0){
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    msg.textContent = "🎉 बाप्पाचे आगमन झाले! गणपती बाप्पा मोरया! 🙏";
    return;
  }
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); diff %= 60000;
  const s = Math.floor(diff / 1000);
  document.getElementById("days").textContent = String(d).padStart(2,"0");
  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

// Flower/petal animation.
const petals = document.getElementById("petals");
const symbols = ["🌼","🌸","🪔","✨"];
function makePetal(){
  const p = document.createElement("span");
  p.className = "petal";
  p.textContent = symbols[Math.floor(Math.random()*symbols.length)];
  p.style.left = Math.random()*100 + "vw";
  p.style.setProperty("--drift",(Math.random()*220-110)+"px");
  p.style.animationDuration = (5+Math.random()*6)+"s";
  p.style.fontSize = (12+Math.random()*12)+"px";
  petals.appendChild(p);
  setTimeout(()=>p.remove(),12000);
}
setInterval(makePetal,700);

// Gallery lightbox.
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.img;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden","false");
  });
});
function closeLightbox(){
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden","true");
  lightboxImg.src = "";
}
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeLightbox(); });
