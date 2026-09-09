const enterButton = document.getElementById("enter-button");
const introScreen = document.querySelector(".intro-screen");
const phoneScreen = document.querySelector(".phone-screen");

enterButton.addEventListener("click", function () {
  introScreen.classList.add("fade-out");
  setTimeout(function () {
    introScreen.style.display = "none";
    phoneScreen.style.display = "block";

    setTimeout(function () {
      phoneScreen.style.opacity = "1";
    }, 50); // Delay to allow the display change to take effect
  }, 800); // Duration of the fade-out animation
});

const phoneContent = document.querySelector(".phone-content");
const passcodeScreen = document.querySelector(".passcode-screen");

let swipeStartY = 0;

phoneContent.addEventListener("pointerdown", function (event) {
  swipeStartY = event.clientY;
  phoneContent.setPointerCapture(event.pointerId);
});

phoneContent.addEventListener("pointerup", function (event) {
  const swipeEndY = event.clientY;
  const swipeDistance = swipeStartY - swipeEndY;

  if (swipeDistance > 80) {
    phoneContent.style.display = "none"; // Adjust threshold as needed
    passcodeScreen.style.display = "block";
  }
});

const keyButtons = document.querySelectorAll(".keypad button");
const dots = document.querySelectorAll(".dot");
const birthdayScreen = document.querySelector(".birthday-screen");
const confettiSound = document.getElementById("confetti-sound");
let enteredPasscode = "";
keyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.textContent;
    if (value === "⌫") {
      enteredPasscode = enteredPasscode.slice(0, -1);
    } else if (value !== "" && enteredPasscode.length < 6) {
      enteredPasscode += value;
    }
    dots.forEach(function (dot, index) {
      if (index < enteredPasscode.length) {
        dot.classList.add("filled");
      } else {
        dot.classList.remove("filled");
      }
    });
    if (enteredPasscode.length === 6) {
      if (enteredPasscode === "999999") {
        confettiSound.currentTime = 0;
        confettiSound.play();
        setTimeout(function () {
          passcodeScreen.style.opacity = "0";
          setTimeout(function () {
            passcodeScreen.style.display = "none";
            birthdayScreen.style.display = "flex";
            setTimeout(function () {
              birthdayScreen.style.opacity = "1";
              createConfetti();
            }, 50);
          }, 800);
        }, 200);
      } else {
        passcodeScreen.classList.add("shake");
        setTimeout(function () {
          passcodeScreen.classList.remove("shake");
          enteredPasscode = "";
          dots.forEach(function (dot) {
            dot.classList.remove("filled");
          });
        }, 400);
      }
    }
  });
});

const confettiContainer = document.querySelector(".confetti-container");

function createConfetti() {
  const colors = [
    "#ff4d6d",
    "#ffd166",
    "#06d6a0",
    "#118ab2",
    "#c77dff",
    "#ffffff",
  ];
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.8 + "s";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";

    confettiContainer.appendChild(confetti);
  }
}
const continueButton = document.getElementById("continue-button");
const homeScreen = document.querySelector(".home-screen");

const photosCard = document.querySelector(".photos-card");
const photosScreen = document.querySelector(".photos-screen");
const photosBackButton = document.querySelector(".photos-back-button");

continueButton.addEventListener("click", function () {
  birthdayScreen.style.opacity = "0";
  setTimeout(function () {
    birthdayScreen.style.display = "none";
    homeScreen.style.display = "block";
    setTimeout(function () {
      homeScreen.style.opacity = "1";
    }, 50);
  }, 800);
});

photosCard.addEventListener("click", function () {
  homeScreen.style.display = "none";

  photosScreen.style.display = "block";
  photosScreen.style.opacity = "1";
});

photosBackButton.addEventListener("click", function () {
  photosScreen.style.display = "none";
  homeScreen.style.display = "block";
  homeScreen.style.opacity = "1";
});

const notesCard = document.querySelector(".notes-card");
const notesOverlay = document.querySelector(".notes-overlay");
const notesPanel = document.querySelector(".notes-panel");
const notesCloseButton = document.querySelector(".notes-close-button");

notesCard.addEventListener("click", function () {
  notesOverlay.style.display = "flex";
  setTimeout(function () {
    notesOverlay.style.opacity = "1";
    notesPanel.style.transform = "translateY(0)";
  }, 50);
});
notesCloseButton.addEventListener("click", function () {
  notesOverlay.style.opacity = "0";
  notesPanel.style.transform = "translateY(100%)";
  setTimeout(function () {
    notesOverlay.style.display = "none";
  }, 400);
});

const spotifyCard = document.querySelector(".spotify-card");
const spotifyScreen = document.querySelector(".spotify-screen");
const spotifyBackButton = document.querySelector(".spotify-back-button");
const spotifyIntroScreen = document.querySelector(".spotify-intro-screen");
const spotifyMainScreen = document.querySelector(".spotify-main-screen");
const songCards=document.querySelectorAll(".song-card");
const musicPlayer=document.getElementById("music-player");
const nowPlayingBar=document.querySelector(".now-playing-bar");
const nowPlayingCover=document.querySelector(".now-playing-cover");
const nowPlayingTitle=document.querySelector(".now-playing-title");
const nowPlayingArtist=document.querySelector(".now-playing-artist");
const nowPlayingButton=document.querySelector(".now-playing-button");


spotifyCard.addEventListener("click", function () {
  homeScreen.style.display = "none";
  spotifyScreen.style.display = "block";
  spotifyScreen.style.opacity = "1";
  if(currentSongCard!==null){
    nowPlayingBar.style.display="flex";
  }

  spotifyMainScreen.style.display = "none";
  spotifyMainScreen.style.opacity = "0";

  spotifyIntroScreen.style.display = "flex";
  spotifyIntroScreen.style.opacity = "0";
  setTimeout(function () {
    spotifyIntroScreen.style.opacity = "1";
  }, 50);
  setTimeout(function () {
    spotifyIntroScreen.style.opacity = "0";
    setTimeout(function () {
      spotifyIntroScreen.style.display = "none";
      spotifyMainScreen.style.display = "flex";
      spotifyMainScreen.style.opacity = "0";
      setTimeout(function () {
        spotifyMainScreen.style.opacity = "1";
      }, 50);
    }, 500);
  }, 2000);
});

spotifyBackButton.addEventListener("click", function () {
  spotifyScreen.style.display = "none";
  nowPlayingBar.style.display="none";
  homeScreen.style.display = "block";
  homeScreen.style.opacity = "1";
});

let currentSongCard=null;
songCards.forEach(function(songCard){
  const playButton=songCard.querySelector(".song-play-button");
  playButton.addEventListener("click", function(event){
    event.stopPropagation();

    const title=songCard.dataset.title;
    const artist=songCard.dataset.artist;
    const src=songCard.dataset.src;
    const cover=songCard.dataset.cover;

    if(currentSongCard===songCard){
      if(musicPlayer.paused){
        musicPlayer.play();
      } else{
        musicPlayer.pause();
      }
      return;
    }
    loadSong(songCard,title,artist,src,cover);
  });
})
function loadSong(
  songCard,title,artist,src,cover
){
  musicPlayer.src=src;
  nowPlayingTitle.textContent=title;
  nowPlayingArtist.textContent=artist;
  nowPlayingCover.src=cover;
  currentSongCard=songCard;
  nowPlayingBar.style.display="flex";
  musicPlayer.play();
}


musicPlayer.addEventListener("play", function(){
  nowPlayingButton.textContent="❚❚";
  songCards.forEach(function(songCard){
    const button = songCard.querySelector(".song-play-button");
    button.textContent = "▶";
  });
  if(currentSongCard !==null){
    const currentButton=currentSongCard.querySelector(".song-play-button");
    currentButton.textContent="❚❚";
  }
});
musicPlayer.addEventListener("pause", function(){
  nowPlayingButton.textContent="▶";
  if(currentSongCard !==null){
    const currentButton=currentSongCard.querySelector(".song-play-button");
    currentButton.textContent="▶";
  }
});
nowPlayingButton.addEventListener("click", function(){
  if(musicPlayer.paused){
    musicPlayer.play();
  }else {
    musicPlayer.pause();
  }
});
const testScreen = "spotify";
if (testScreen === "spotify") {
  // Hide the normal beginning
  introScreen.style.display = "none";

  // Make the simulated phone available
  phoneScreen.style.display = "block";
  phoneScreen.style.opacity = "1";

  // Hide screens we don't need
  phoneContent.style.display = "none";
  passcodeScreen.style.display = "none";
  birthdayScreen.style.display = "none";
  homeScreen.style.display = "none";
  photosScreen.style.display = "none";

  // Open Spotify directly
  spotifyScreen.style.display = "block";
  spotifyScreen.style.opacity = "1";

  // Skip the Spotify splash screen
  spotifyIntroScreen.style.display = "none";

  // Go straight to the actual player
  spotifyMainScreen.style.display = "flex";
  spotifyMainScreen.style.opacity = "1";
}