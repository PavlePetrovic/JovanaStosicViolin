const body = document.querySelector("body");

const mobileMenuTooltipBox = document.getElementById("mobile-menu-tooltip-box");
const mobileMenuTooltip = document.getElementById("mobile-menu-tooltip");
const mobileMenuIcon = document.getElementById("mobile-menu-icon");

body.addEventListener("click", (e) => {
  if (e.target.id !== "mobile-menu-icon" && e.target.id !== "mobile-menu-tooltip") {
    mobileMenuTooltipBox.classList.add("hidden");
    mobileMenuIcon.style.display = "flex";
  }
});

mobileMenuIcon.addEventListener("click", (e) => {
  console.log(e);
  e.preventDefault;
  mobileMenuTooltipBox.classList.toggle("hidden");
  mobileMenuIcon.style.display = "none";
});

let isPlaying = false;
const audioIco = document.querySelector(".audio-ico");
const audio = new Audio("./assets/audio-song.mp3");
audioIco.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
audio.volume = 0.7;

audio.addEventListener(
  "ended",
  () => {
    audio.currentTime = 0;
    audio.play();
  },
  false
);

const playAudio = () => {
  audio.play();
};

const stopAudio = () => {
  audio.pause();
};

audioIco.addEventListener("click", (e) => {
  if (isPlaying) {
    audioIco.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    stopAudio();
  } else {
    audioIco.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    playAudio();
  }
  isPlaying = !isPlaying;
});
