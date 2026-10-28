// ========================================
// ACT I: DATE-LOCK COUNTDOWN & UNLOCK
// ========================================

const enterButton = document.getElementById("enter-button");
const introScreen = document.querySelector(".intro-screen");
const phoneScreen = document.querySelector(".phone-screen");
const verificationScreen = document.querySelector(".verification-screen");
const verificationYes = document.querySelector(".verification-yes");
const verificationNo = document.querySelector(".verification-no");

const countdownDays = document.getElementById("countdown-days");
const countdownHours = document.getElementById("countdown-hours");
const countdownMinutes = document.getElementById("countdown-minutes");
const countdownSeconds = document.getElementById("countdown-seconds");
const unlockDate = new Date(2026, 9, 30, 0, 0, 0); // 30 October 2026, 00:00:00
const lockFeedback = document.getElementById("lock-feedback");
const paperEnvelope = document.getElementById("paper-envelope");

function showLockFeedback(message) {
  if (!lockFeedback) return;
  lockFeedback.textContent = message;
  lockFeedback.classList.add("is-visible");
}

if (paperEnvelope) {
  const revealEnvelopeHint = () => {
    const now = new Date();
    showLockFeedback(now < unlockDate
      ? "Psst... this little envelope is keeping your surprise safe. Come back on your birthday! ♡"
      : "The seal is ready to open. Tap the date tab below! ✨");
    paperEnvelope.classList.remove("envelope-wiggle");
    void paperEnvelope.offsetWidth;
    paperEnvelope.classList.add("envelope-wiggle");
  };
  paperEnvelope.addEventListener("click", revealEnvelopeHint);
  paperEnvelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      revealEnvelopeHint();
    }
  });
}

function updateCountdown() {
  const now = new Date();
  const diff = unlockDate - now;

  if (diff <= 0) {
    if (countdownDays) countdownDays.textContent = "00";
    if (countdownHours) countdownHours.textContent = "00";
    if (countdownMinutes) countdownMinutes.textContent = "00";
    if (countdownSeconds) countdownSeconds.textContent = "00";
    const statusLabel = document.querySelector(".btn-lock-status");
    if (statusLabel) statusLabel.textContent = "STATUS: UNLOCKED";
    const subtext = document.querySelector(".btn-subtext");
    if (subtext) subtext.textContent = "Click to open capsule ✦";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (countdownDays) countdownDays.textContent = String(days).padStart(2, "0");
  if (countdownHours) countdownHours.textContent = String(hours).padStart(2, "0");
  if (countdownMinutes) countdownMinutes.textContent = String(minutes).padStart(2, "0");
  if (countdownSeconds) countdownSeconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/// Proceed from Date Lock to Verification (WITH TIME LOCK)
enterButton.addEventListener("click", function () {
  const now = new Date();

  // 1. Check if the current time is BEFORE the unlock date
  if (now < unlockDate) {
    showLockFeedback("Not yet, birthday girl! Your surprise unlocks at midnight on 30 October. 🎀");
    // Play the playful paper-tab shake without bypassing the real date lock.
    enterButton.classList.add("shake");

    // Remove the class after the animation finishes so it can be triggered again
    setTimeout(function () {
      enterButton.classList.remove("shake");
    }, 400);

    return; // STOP the function here. Do not proceed to the next screen.
  }

  // 2. If the date has passed, proceed normally!
  if (lockFeedback) lockFeedback.classList.remove("is-visible");
  introScreen.style.opacity = "0";
  setTimeout(function () {
    introScreen.style.display = "none";

    verificationScreen.style.display = "flex";
    setTimeout(function () {
      verificationScreen.style.opacity = "1";
    }, 50);
  }, 800);
});
// ========================================
// ACT II: VERIFICATION LOGIC
// ========================================
const btnYes = document.querySelector(".verification-yes");
const btnNo = document.querySelector(".verification-no");
const evasionBubble = document.getElementById("evasion-bubble");

const evasionPhrases = [
  "Too slow! 🏃💨",
  "Nice try Joy! 😂",
  "Accept reality! 🔴⚽",
  "Error 404: Wins not found 🤡",
  "Just click it already! 💃",
  "Really,it should be easy🤡"
];
let evasionCount = 0;

// The Dodging Logic
function dodgeButton() {

  if (btnNo.parentElement !== verificationScreen) {
    verificationScreen.appendChild(btnNo);

    btnNo.style.width = "max-content";
    btnNo.style.height = "auto";
    btnNo.style.padding = "12px 24px";
  }

  const btnWidth = btnNo.offsetWidth;
  const btnHeight = btnNo.offsetHeight;

  // Calculate boundaries so it can fly anywhere on the screen
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;



  // Keep it safely inside the screen padding
  const maxX = viewportWidth - btnWidth - 40;
  const maxY = viewportHeight - btnHeight - 40;

  const randomX = Math.floor(Math.random() * maxX) + 20;
  const randomY = Math.floor(Math.random() * maxY) + 20;

  // Add subtle tilt for visual flair
  const randomTilt = Math.floor(Math.random() * 30) - 15; // -15deg to +15deg

  // Switch to fixed positioning so it escapes the card container
  btnNo.style.position = "absolute";
  btnNo.style.left = `${randomX}px`;
  btnNo.style.top = `${randomY}px`;
  btnNo.style.transform = `rotate(${randomTilt}deg)`;
  btnNo.style.zIndex = "200";

  // Trigger the snarky Speech Bubble
  evasionBubble.textContent = evasionPhrases[evasionCount % evasionPhrases.length];
  evasionCount++;

  // Reset and restart the pop-in animation
  evasionBubble.classList.remove("pop-in");
  void evasionBubble.offsetWidth; // Force a browser reflow
  evasionBubble.classList.add("pop-in");
}

// Trigger dodge on both hover (desktop) and touch (mobile)
btnNo.addEventListener("mouseover", dodgeButton);
btnNo.addEventListener("touchstart", function (e) {
  e.preventDefault(); // Prevents iOS from attempting to highlight/click
  dodgeButton();
});

// Success Logic: Transition to Phone Lock Screen
btnYes.addEventListener("click", function () {
  const phoneContent = document.querySelector(".phone-content");
  const caseSolvedStamp = document.getElementById("case-solved-stamp");

  verificationScreen.classList.add("case-solved");
  if (caseSolvedStamp) caseSolvedStamp.textContent = "✓ CASE SOLVED!";

  // Keep the original journey: the quiz leads to the simulated phone lock screen.
  setTimeout(function () {
    phoneScreen.style.display = "block";
    phoneScreen.style.opacity = "1";
    if (phoneContent) phoneContent.style.display = "flex";
    verificationScreen.style.opacity = "0";

    setTimeout(function () {
      verificationScreen.style.display = "none";
      verificationScreen.classList.remove("case-solved");
    }, 800);
  }, 520);
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

  if (swipeDistance > 50) {
    phoneContent.style.display = "none";
    passcodeScreen.style.display = "block";
    passcodeScreen.style.opacity = "1";
  }
});

phoneContent.addEventListener("pointercancel", function () {
  swipeStartY = 0;
});

//birthday screen
const keyButtons = document.querySelectorAll(".keypad button");
const dots = document.querySelectorAll(".dot");
const passcodeDots = document.querySelector(".passcode-dots");
const birthdayScreen = document.querySelector(".birthday-screen");
const confettiSound = document.getElementById("confetti-sound");
const confettiContainer = document.querySelector(".confetti-container");
const continueButton = document.getElementById("continue-button");
const homeScreen = document.querySelector(".home-screen");
let enteredPasscode = "";
let isKeypadLocked = false;

keyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (isKeypadLocked) return;

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
        // 1. The Pacing: Instantly blackout the passcode screen
        passcodeScreen.style.transition = "background-color 0.1s ease, opacity 0.8s ease";
        passcodeScreen.style.backgroundColor = "#000000";

        setTimeout(function () {
          passcodeScreen.style.opacity = "0";

          setTimeout(function () {
            passcodeScreen.style.display = "none";
            birthdayScreen.style.display = "flex";
            birthdayScreen.classList.remove("reveal-active");

            // Match the blackout state initially
            birthdayScreen.classList.add("dimmed");
            birthdayScreen.style.opacity = "1";

            // 2. The Burst: Remove blackout, play audio, launch confetti
            setTimeout(function () {
              birthdayScreen.classList.remove("dimmed");
              requestAnimationFrame(function () {
                birthdayScreen.classList.add("reveal-active");
              });
              if (confettiSound) {
                confettiSound.currentTime = 0;
                confettiSound.play();
              }
              createConfetti();
            }, 350);

          }, 800);
        }, 150);

      } else {
        // RESTORED: Wrong passcode shake logic
        isKeypadLocked = true;
        passcodeDots.classList.add("shake");
        setTimeout(function () {
          passcodeDots.classList.remove("shake");
          enteredPasscode = "";
          dots.forEach(function (dot) {
            dot.classList.remove("filled");
          });
          isKeypadLocked = false;
        }, 400);
      }
    }
  });
}); // <--- THIS correctly closes the keypad listener

function createConfetti() {
  if (!confettiContainer) return;
  confettiContainer.innerHTML = "";
  const colors = [
    "#FFD700", // Gold
    "#7b2ff7", // Violet
    "#4169e1", // Royal Blue
    "#ffffff", // White Sparkle
  ];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Convert 30% of particles into glowing circular sparklers
    if (Math.random() > 0.7) {
      confetti.style.borderRadius = "50%";
      confetti.style.width = "7px";
      confetti.style.height = "7px";
      confetti.style.boxShadow = `0 0 10px ${confetti.style.backgroundColor}`;
    }

    confetti.style.animationDelay = Math.random() * 0.8 + "s";
    confetti.style.animationDuration = 2 + Math.random() * 2.5 + "s";

    confettiContainer.appendChild(confetti);
  }
}

// ========================================
// CONTINUE TO HOME SCREEN
// ========================================

continueButton.addEventListener("click", function () {
  confettiContainer.innerHTML = "";
  birthdayScreen.style.opacity = "0";
  setTimeout(function () {
    birthdayScreen.style.display = "none";
    homeScreen.style.display = "block";
    setTimeout(function () {
      homeScreen.style.opacity = "1";
    }, 50);
  }, 800);
});
//photos
// ========================================
// GOOGLE PHOTOS
// ========================================

const photosCard = document.querySelector(".photos-card");

const photosScreen = document.querySelector(".photos-screen");

const photosLandingScreen = document.querySelector(".photos-landing-screen");

const photosMemoriesScreen = document.querySelector(".photos-memories-screen");

const photosHomeButton = document.querySelector(".photos-home-button");

const openMemoriesButton = document.querySelector(".open-memories-button");

const memoriesBackButton = document.querySelector(".memories-back-button");

// ========================================
// GOOGLE PHOTOS NAVIGATION
// ========================================

photosCard.addEventListener("click", function () {
  trackAppOpen("photos");
  // Cover the Home screen immediately
  photosScreen.style.display = "block";

  photosLandingScreen.style.display = "flex";
  photosMemoriesScreen.style.display = "none";

  photosLandingScreen.style.opacity = "0";

  setTimeout(function () {
    photosLandingScreen.style.opacity = "1";
  }, 50);

  setTimeout(function () {
    homeScreen.style.display = "none";
  }, 500);
});

openMemoriesButton.addEventListener("click", function () {
  photosLandingScreen.style.opacity = "0";

  setTimeout(function () {
    photosLandingScreen.style.display = "none";

    photosMemoriesScreen.style.display = "block";
    photosMemoriesScreen.style.opacity = "0";

    setTimeout(function () {
      photosMemoriesScreen.style.opacity = "1";
    }, 50);
  }, 500);
});

memoriesBackButton.addEventListener("click", function () {
  photosScreen.style.display = "none";

  photosMemoriesScreen.style.display = "none";
  photosMemoriesScreen.style.opacity = "0";

  homeScreen.style.display = "block";
  homeScreen.style.opacity = "1";
});

photosHomeButton.addEventListener("click", function () {
  photosScreen.style.display = "none";

  homeScreen.style.display = "block";
  homeScreen.style.opacity = "1";
});

// ========================================
// MEMORY GRID / FULLSCREEN VIEWER
// ========================================

const memoryGridItems = document.querySelectorAll(".memory-grid-item");

const memoryFullscreenViewer = document.querySelector(
  ".memory-fullscreen-viewer",
);

const memoryViewerClose = document.querySelector(".memory-viewer-close-button");

const viewerMemoryImage = document.querySelector(".viewer-memory-image");

const viewerPeriod = document.querySelector(".viewer-period");

const viewerDate = document.querySelector(".viewer-date");

const viewerCaption = document.querySelector(".viewer-caption");

const viewerPhotoArea = document.querySelector(".viewer-photo-area");

const viewerThumbnails = document.querySelector(".viewer-thumbnails-container");

let currentMemoryIndex = 0;

// ========================================
// SHOW CURRENT MEMORY
// ========================================

function showMemory() {
  const memory = memoryGridItems[currentMemoryIndex];

  console.log("Selected image:", memory.dataset.src);

  viewerMemoryImage.src = memory.dataset.src;
  console.log("Viewer image src :", viewerMemoryImage.src);

  viewerPeriod.textContent = memory.dataset.period;

  viewerDate.textContent = memory.dataset.date;

  viewerCaption.textContent = memory.dataset.caption;

  updateViewerThumbnails();
}

// ========================================
// OPEN MEMORY FROM GRID
// ========================================

memoryGridItems.forEach(function (item, index) {
  item.addEventListener("click", function () {
    currentMemoryIndex = index;

    memoryFullscreenViewer.style.display = "flex";

    showMemory();
  });
});

// ========================================
// CREATE BOTTOM THUMBNAILS
// ========================================

function createViewerThumbnails() {
  viewerThumbnails.innerHTML = "";

  memoryGridItems.forEach(function (item, index) {
    const button = document.createElement("button");

    button.classList.add("viewer-thumbnail");
    button.type = "button";

    const image = document.createElement("img");

    image.src = item.dataset.src;
    image.alt = "Memory thumbnail";

    button.appendChild(image);

    viewerThumbnails.appendChild(button);

    button.addEventListener("click", function () {
      currentMemoryIndex = index;

      showMemory();
    });
  });
}

createViewerThumbnails();

// ========================================
// ACTIVE THUMBNAIL
// ========================================

function updateViewerThumbnails() {
  const thumbnails = document.querySelectorAll(".viewer-thumbnail");

  thumbnails.forEach(function (thumbnail, index) {
    if (index === currentMemoryIndex) {
      thumbnail.classList.add("active");
    } else {
      thumbnail.classList.remove("active");
    }
  });
}

// ========================================
// SWIPE THROUGH MEMORIES
// ========================================

let memorySwipeStartX = 0;

viewerPhotoArea.addEventListener("pointerdown", function (event) {
  memorySwipeStartX = event.clientX;
  viewerPhotoArea.setPointerCapture(event.pointerId);
});

viewerPhotoArea.addEventListener("pointerup", function (event) {
  const memorySwipeEndX = event.clientX;

  const swipeDistance = memorySwipeStartX - memorySwipeEndX;

  if (swipeDistance > 60) {
    nextMemory();
  } else if (swipeDistance < -60) {
    previousMemory();
  }
});

viewerPhotoArea.addEventListener("pointercancel", function () {
  memorySwipeStartX = 0;
});

// ========================================
// NEXT / PREVIOUS MEMORY
// ========================================

function nextMemory() {
  if (currentMemoryIndex < memoryGridItems.length - 1) {
    currentMemoryIndex++;

    showMemory();
  }
}

function previousMemory() {
  if (currentMemoryIndex > 0) {
    currentMemoryIndex--;

    showMemory();
  }
}

// ========================================
// CLOSE FULLSCREEN VIEWER
// ========================================

memoryViewerClose.addEventListener("click", function () {
  memoryFullscreenViewer.style.display = "none";
});

//notes
const notesCard = document.querySelector(".notes-card");
const notesOverlay = document.querySelector(".notes-overlay");
const notesPanel = document.querySelector(".notes-panel");
const notesCloseButton = document.querySelector(".notes-close-button");

notesCard.addEventListener("click", function () {
  trackAppOpen("notes");
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

//spotify
const spotifyCard = document.querySelector(".spotify-card");
const spotifyScreen = document.querySelector(".spotify-screen");
const spotifyBackButton = document.querySelector(".spotify-back-button");
const spotifyIntroScreen = document.querySelector(".spotify-intro-screen");
const spotifyMainScreen = document.querySelector(".spotify-main-screen");
const songCards = document.querySelectorAll(".song-card");
const musicPlayer = document.getElementById("music-player");
const nowPlayingBar = document.querySelector(".now-playing-bar");
const nowPlayingCover = document.querySelector(".now-playing-cover");
const nowPlayingTitle = document.querySelector(".now-playing-title");
const nowPlayingArtist = document.querySelector(".now-playing-artist");
const nowPlayingButton = document.querySelector(".now-playing-button");

spotifyCard.addEventListener("click", function () {
  trackAppOpen("spotify");
  homeScreen.style.display = "none";
  spotifyScreen.style.display = "block";
  spotifyScreen.style.opacity = "1";
  if (currentSongCard !== null) {
    nowPlayingBar.style.display = "flex";
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
  nowPlayingBar.style.display = "none";
  homeScreen.style.display = "block";
  homeScreen.style.opacity = "1";
});

let currentSongCard = null;
songCards.forEach(function (songCard) {
  const playButton = songCard.querySelector(".song-play-button");
  playButton.addEventListener("click", function (event) {
    event.stopPropagation();

    const title = songCard.dataset.title;
    const artist = songCard.dataset.artist;
    const src = songCard.dataset.src;
    const cover = songCard.dataset.cover;

    if (currentSongCard === songCard) {
      if (musicPlayer.paused) {
        musicPlayer.play();
      } else {
        musicPlayer.pause();
      }
      return;
    }
    loadSong(songCard, title, artist, src, cover);
  });
});
function loadSong(songCard, title, artist, src, cover) {
  musicPlayer.src = src;
  nowPlayingTitle.textContent = title;
  nowPlayingArtist.textContent = artist;
  nowPlayingCover.src = cover;
  currentSongCard = songCard;
  nowPlayingBar.style.display = "flex";
  musicPlayer.play();
}

musicPlayer.addEventListener("play", function () {
  nowPlayingButton.textContent = "❚❚";
  songCards.forEach(function (songCard) {
    const button = songCard.querySelector(".song-play-button");
    button.textContent = "▶";
  });
  if (currentSongCard !== null) {
    const currentButton = currentSongCard.querySelector(".song-play-button");
    currentButton.textContent = "❚❚";
  }
});
musicPlayer.addEventListener("pause", function () {
  nowPlayingButton.textContent = "▶";
  if (currentSongCard !== null) {
    const currentButton = currentSongCard.querySelector(".song-play-button");
    currentButton.textContent = "▶";
  }
});
musicPlayer.addEventListener("ended", function () {
  const songs = Array.from(songCards);
  const currentIndex = songs.indexOf(currentSongCard);
  const nextIndex = currentIndex + 1;
  if (nextIndex < songs.length) {
    const nextSongCard = songs[nextIndex];
    const title = nextSongCard.dataset.title;
    const artist = nextSongCard.dataset.artist;
    const src = nextSongCard.dataset.src;
    const cover = nextSongCard.dataset.cover;

    loadSong(nextSongCard, title, artist, src, cover);
    nextSongCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  } else {
    nowPlayingButton.textContent = "▶";
    if (currentSongCard !== null) {
      const currentButton = currentSongCard.querySelector(".song-play-button");
      currentButton.textContent = "▶";
    }
  }
});
nowPlayingButton.addEventListener("click", function () {
  if (musicPlayer.paused) {
    musicPlayer.play();
  } else {
    musicPlayer.pause();
  }
});

//snapchat
const snapchatCard = document.querySelector(".snapchat-card");
const snapchatScreen = document.querySelector(".snapchat-screen");
const snapchatIntroScreen = document.querySelector(".snapchat-intro-screen");
const snapchatMainScreen = document.querySelector(".snapchat-main-screen");
const snapchatBackButton = document.querySelector(".snapchat-back-button");
const snapViewer = document.querySelector(".snap-viewer");

snapchatCard.addEventListener("click", function () {
  trackAppOpen("snapchat");
  homeScreen.style.display = "none";

  snapchatScreen.style.display = "block";
  snapchatScreen.style.opacity = "1";

  snapchatMainScreen.style.display = "none";
  snapchatMainScreen.style.opacity = "0";

  snapViewer.style.display = "none";

  snapchatIntroScreen.style.display = "flex";
  snapchatIntroScreen.style.opacity = "0";
  setTimeout(function () {
    snapchatIntroScreen.style.opacity = "1";
  }, 50);
  setTimeout(function () {
    snapchatIntroScreen.style.opacity = "0";
    setTimeout(function () {
      snapchatIntroScreen.style.display = "none";
      snapchatMainScreen.style.display = "flex";
      snapchatMainScreen.style.opacity = "0";
      setTimeout(function () {
        snapchatMainScreen.style.opacity = "1";
      }, 50);
    }, 400);
  }, 1200);
});

snapchatBackButton.addEventListener("click", function () {
  clearTimeout(snapTimer);
  snapVideo.pause();
  snapVideo.currentTime = 0;

  snapchatScreen.style.display = "none";
  snapchatScreen.style.opacity = "0";

  snapchatIntroScreen.style.display = "none";

  snapchatMainScreen.style.display = "none";
  snapchatMainScreen.style.opacity = "0";

  snapViewer.style.display = "none";

  homeScreen.style.display = "block";
  homeScreen.style.opacity = "1";
});

const viewSnapButtons = document.querySelectorAll(".view-snap-button");
const snapCloseButton = document.querySelector(".snap-close-button");
const snapSenderAvatar = document.querySelector(".snap-sender-avatar");
const snapSenderName = document.querySelector(".snap-sender-name");
const snapViewerTime = document.querySelector(".snap-viewer-time");
const snapImage = document.querySelector(".snap-image");
const snapVideo = document.querySelector(".snap-video");

let currentSender = "";
let currentSnapIndex = 0;

viewSnapButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const name = button.dataset.name;
    const avatar = button.dataset.avatar;
    const time = button.dataset.time;

    snapSenderName.textContent = name;
    snapSenderAvatar.src = avatar;
    snapViewerTime.textContent = time;

    currentSender = name;
    currentSnapIndex = 0;

    snapchatMainScreen.style.display = "none";
    snapViewer.style.display = "block";

    createSnapProgress();

    showSnap();
  });
});

snapCloseButton.addEventListener("click", function () {
  clearTimeout(snapTimer);

  snapVideo.pause();
  snapVideo.currentTime = 0;

  snapViewer.style.display = "none";

  snapchatMainScreen.style.display = "flex";
  snapchatMainScreen.style.opacity = "1";
});

const snapData = {
  Carson: [
    {
      type: "image",
      src: "images/snapchat/carsonsnap2.jpg",
    },
    {
      type: "image",
      src: "images/snapchat/carsonsnap1.jpg",
    },
  ],
  "Joydine🍒 ✪": [
    {
      type: "image",
      src: "images/googleimages/googlephoto1.jpg",
    },
    {
      type: "video",
      src: "images/snapchat/joydinesnap2.mp4",
    },
  ],
  Biggie: [
    {
      type: "video",
      src: "images/snapchat/luissnap1.mp4",
    },
    {
      type: "video",
      src: "images/snapchat/luissnap2.mp4",
    },
    {
      type: "image",
      src: "images/googleimages/googlephoto2.jpg",
    },
  ],
  "Sweeney♥!": [
    {
      type: "image",
      src: "images/googleimages/googlephoto3.jpg",
    },
    {
      type: "image",
      src: "images/googleimages/googlephoto2.jpg",
    },
  ],
  "Adora❤️": [
    {
      type: "image",
      src: "images/pinkpantheres.jpg",
    },
    {
      type: "image",
      src: "images/googleimages/googlephoto1.jpg",
    },
  ],
};

function showSnap() {
  clearTimeout(snapTimer);

  updateSnapProgress();

  const senderSnaps = snapData[currentSender];
  const currentSnap = senderSnaps[currentSnapIndex];

  console.log("snap viewed");

  if (currentSnap.type === "image") {
    snapVideo.pause();
    snapVideo.style.display = "none";

    snapImage.src = currentSnap.src;
    snapImage.style.display = "block";

    startImageProgress();
  } else if (currentSnap.type === "video") {
    snapVideo.pause();
    snapImage.style.display = "none";

    snapVideo.src = currentSnap.src;
    snapVideo.style.display = "block";
    snapVideo.currentTime = 0;

    startVideoProgress();

    const playPromise = snapVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(function (error) {
        console.log("Snap video autoplay restricted, retrying muted:", error);
        snapVideo.muted = true;
        snapVideo.play().catch(function (err) {
          console.log("Muted video play also failed, setting fallback timer:", err);
          snapTimer = setTimeout(function () {
            nextSnap();
          }, 7000);
        });
      });
    }
  }
}

const snapMedia = document.querySelector(".snap-media");

snapMedia.addEventListener("click", function (event) {
  const senderSnaps = snapData[currentSender];

  const rect = snapMedia.getBoundingClientRect();
  const tapPosition = event.clientX - rect.left;
  const mediaWidth = rect.width;

  if (tapPosition < mediaWidth / 2) {
    if (currentSnapIndex > 0) {
      clearTimeout(snapTimer);
      currentSnapIndex--;
      showSnap();
    }
  } else {
    nextSnap();
  }
});

const snapProgress = document.querySelector(".snap-progress");
//creating the bars and their fill
function createSnapProgress() {
  const senderSnaps = snapData[currentSender];

  snapProgress.innerHTML = "";
  senderSnaps.forEach(function () {
    const bar = document.createElement("div");
    bar.classList.add("snap-progress-bar");

    const fill = document.createElement("div");
    fill.classList.add("snap-progress-fill");
    bar.appendChild(fill);

    snapProgress.appendChild(bar);
  });
}
//updating the bars
function updateSnapProgress() {
  const bars = document.querySelectorAll(".snap-progress-bar");

  bars.forEach(function (bar, index) {
    const fill = bar.querySelector(".snap-progress-fill");
    fill.style.transition = "none";

    if (index < currentSnapIndex) {
      fill.style.width = "100%";
    } else if (index === currentSnapIndex) {
      fill.style.width = "0%";
    } else {
      fill.style.width = "0%";
    }
  });
}

let snapTimer = null;
const imageSnapDuration = 5000;

function nextSnap() {
  const senderSnaps = snapData[currentSender];
  clearTimeout(snapTimer);

  if (currentSnapIndex < senderSnaps.length - 1) {
    currentSnapIndex++;
    showSnap();
  } else {
    snapVideo.pause();

    snapViewer.style.display = "none";

    snapchatMainScreen.style.display = "flex";
    snapchatMainScreen.style.opacity = "1";
  }
}

function startImageProgress() {
  const bars = document.querySelectorAll(".snap-progress-bar");
  const currentBar = bars[currentSnapIndex];
  const fill = currentBar.querySelector(".snap-progress-fill");

  fill.style.transition = "none";
  fill.style.width = "0%";

  setTimeout(function () {
    fill.style.transition = "width 5s linear";
    fill.style.width = "100%";
  }, 50);

  snapTimer = setTimeout(function () {
    nextSnap();
  }, imageSnapDuration);
}

function startVideoProgress() {
  const bars = document.querySelectorAll(".snap-progress-bar");
  const currentBar = bars[currentSnapIndex];
  const fill = currentBar.querySelector(".snap-progress-fill");

  fill.style.transition = "none";
  fill.style.width = "0%";

  snapVideo.onplaying = function () {
    const videoDuration = snapVideo.duration;

    if (!Number.isFinite(videoDuration) || videoDuration <= 0) {
      return;
    }
    fill.style.transition = `width ${videoDuration}s linear`;
    fill.style.width = "100%";
  };

  snapVideo.onended = function () {
    nextSnap();
  };
}


//whatsapp


const whatsappCard = document.querySelector(".whatsapp-card");
const whatsappScreen = document.querySelector(".whatsapp-screen");
const chatListScreen = document.querySelector(".whatsapp-chat-list");
const chatViewScreen = document.querySelector(".whatsapp-chat-view");

const listBackButton = document.querySelector(".list-back-button");
const whatsappSplashScreen = document.querySelector(".whatsapp-splash-screen");
const chatBackButton = document.querySelector(".whatsapp-back-button");

// 1. Home Screen -> Splash Screen -> Chat List
whatsappCard.addEventListener("click", function () {
  trackAppOpen("whatsapp");
  homeScreen.style.display = "none";

  // Turn on the main screen wrapper
  whatsappScreen.style.display = "block";

  // CRITICAL FIX: Hide the chat list COMPLETELY so it doesn't peek through during fade
  chatListScreen.style.display = "none";
  chatViewScreen.style.display = "none";

  whatsappSplashScreen.style.display = "flex";
  whatsappSplashScreen.style.opacity = "1";

  // Fade in the whole app environment
  setTimeout(function () {
    whatsappScreen.style.opacity = "1";
  }, 50);

  // The Splash Screen delay (1.2s) before fading out
  setTimeout(function () {
    // Show the chat list right as the splash screen starts to fade out
    chatListScreen.style.display = "flex";
    whatsappSplashScreen.style.opacity = "0";

    // Completely hide the splash screen after the fade finishes
    setTimeout(function () {
      whatsappSplashScreen.style.display = "none";
    }, 500);

  }, 1200);
});

// 2. Chat List -> Home Screen
listBackButton.addEventListener("click", function () {
  whatsappScreen.style.opacity = "0"; // CRITICAL FIX: Changed from "1" to "0" to reset the fade
  setTimeout(function () {
    whatsappScreen.style.display = "none";
    homeScreen.style.display = "block";
    setTimeout(function () {
      homeScreen.style.opacity = "1";
    }, 50);
  }, 300);
});// ========================================
// WHATSAPP DYNAMIC CHAT LOGIC
// ========================================

// 1. The Chat Data Dictionary
// Replace the placeholder paragraphs here with the secret messages from your friends!
const whatsappData = {
  "Carson": {
    avatar: "images/whatsapp/me.jpeg",
    messages: `
      <div class="chat-date">Yesterday</div>
      <div class="chat-bubble received">
        <p>Hey Steph, I made something for you.</p>
        <span class="timestamp">11:58 PM</span>
      </div>
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>It's finally time to open it. Happy Birthday! ❤️</p>
        <span class="timestamp">12:00 AM</span>
      </div>`
  },
  "Joydine": {
    avatar: "images/whatsapp/joydine.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>Happy Birthday Steph!! I'm so glad we met. [Insert Joydine's secret paragraph here]</p>
        <span class="timestamp">8:30 AM</span>
      </div>`
  },
  "Adora": {
    avatar: "images/whatsapp/adora.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>[Insert Adora's secret paragraph here] Have the best day ever!!</p>
        <span class="timestamp">9:15 AM</span>
      </div>`
  },
  "Luis": {
    avatar: "images/whatsapp/luis.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>[Insert Luis's secret paragraph here] Happy Birthday!</p>
        <span class="timestamp">10:00 AM</span>
      </div>`
  },
  "Sweeney": {
    avatar: "images/whatsapp/sweeney.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>[Insert Sweeney's secret paragraph here] ❤️</p>
        <span class="timestamp">10:45 AM</span>
      </div>`
  },
  "Amani": {
    avatar: "images/whatsapp/amani.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>[Insert Amani's secret paragraph here]</p>
        <span class="timestamp">11:10 AM</span>
      </div>`
  },
  "Mikey": {
    avatar: "images/whatsapp/mikey.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>[Insert Mikey's secret paragraph here] 🎉</p>
        <span class="timestamp">11:30 AM</span>
      </div>`
  }
};

// 2. Dynamic Click Listeners
const chatListItems = document.querySelectorAll(".chat-list-item");
const chatViewHeaderName = document.querySelector(".whatsapp-chat-view .header-info h2");
const chatViewHeaderAvatar = document.querySelector(".whatsapp-chat-view .header-avatar");
const chatViewArea = document.querySelector(".whatsapp-chat-area");

chatListItems.forEach(function (row) {
  row.addEventListener("click", function () {

    // Grab the name of the person clicked from the bold <strong> tag
    const contactName = row.querySelector(".chat-list-top strong").textContent.trim();

    // Clear the unread badges if they exist on this specific row
    const unreadBadge = row.querySelector(".unread-badge");
    const unreadTime = row.querySelector(".unread-time");
    const unreadText = row.querySelector(".unread-text");

    if (unreadBadge) unreadBadge.style.display = "none";
    if (unreadTime) unreadTime.classList.remove("unread-time");
    if (unreadText) unreadText.classList.remove("unread-text");

    // Inject the correct data into the chat view
    if (whatsappData[contactName]) {
      chatViewHeaderName.textContent = contactName;
      chatViewHeaderAvatar.src = whatsappData[contactName].avatar;
      chatViewArea.innerHTML = whatsappData[contactName].messages;
    }

    // Switch the screens
    chatListScreen.style.display = "none";
    chatViewScreen.style.display = "flex";
  });
});
// 4. Back from Carson's Chat -> Chat List
chatBackButton.addEventListener("click", function () {
  chatViewScreen.style.display = "none";
  chatListScreen.style.display = "flex";
});


// ========================================
// THE DIRECTOR: GLOBAL STATE TRACKER
// ========================================

const secretNotification = document.getElementById("secret-notification");
const incomingCallScreen = document.getElementById("incoming-call-screen");

let hasOpenedWhatsapp = false;
let appsOpenedSinceWhatsapp = 0;
let hasShownNotification = false;
let appsOpenedSinceNotification = 0;
let hasTriggeredCall = false;

// 1. The Central Brain
function trackAppOpen(appName) {
  console.log(`Director: User opened ${appName}`);

  if (appName === "whatsapp") {
    hasOpenedWhatsapp = true;
    return;
  }

  // Phase 1: Wait for 2 apps after WhatsApp
  if (hasOpenedWhatsapp && !hasShownNotification) {
    appsOpenedSinceWhatsapp++;
    if (appsOpenedSinceWhatsapp >= 2) {
      triggerCreepyNotification();
    }
    return;
  }

  // Phase 2: Wait for 1 app after the Notification
  if (hasShownNotification && !hasTriggeredCall) {
    appsOpenedSinceNotification++;
    if (appsOpenedSinceNotification >= 1) {
      triggerIncomingCall();
    }
  }
}

// 2. Event Triggers
function triggerCreepyNotification() {
  hasShownNotification = true;
  const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2 to 5 seconds

  setTimeout(() => {
    secretNotification.classList.add("show");

    // Hide it automatically after 4 seconds
    setTimeout(() => {
      secretNotification.classList.remove("show");
    }, 4000);
  }, randomDelay);
}

function triggerIncomingCall() {
  hasTriggeredCall = true;
  const randomDelay = Math.floor(Math.random() * 3000) + 3000; // 3 to 6 seconds

  setTimeout(() => {
    // We now just add the "show" class to trigger the smooth iOS slide-down
    incomingCallScreen.classList.add("show");
  }, randomDelay);
}



//test screens
const testScreen = ""; // Set temporarily to "home", "verification", "birthday", etc. only when debugging.

if (testScreen !== "") {
  // Hide the normal beginning
  introScreen.style.display = "none";
  verificationScreen.style.display = "none";

  // Make the simulated phone available
  phoneScreen.style.display = "block";
  phoneScreen.style.opacity = "1";

  // Hide screens we don't need
  phoneContent.style.display = "none";
  passcodeScreen.style.display = "none";
  birthdayScreen.style.display = "none";
  homeScreen.style.display = "none";
  photosScreen.style.display = "none";
  spotifyScreen.style.display = "none";
  notesOverlay.style.display = "none";
  snapchatScreen.style.display = "none";


  if (testScreen === "verification") {
    phoneScreen.style.display = "none";
    verificationScreen.style.display = "flex";
    verificationScreen.style.opacity = "1";
  }
  else if (testScreen === "lock") {
    phoneContent.style.display = "flex";
  }
  else if (testScreen === "passcode") {
    passcodeScreen.style.display = "block";
    passcodeScreen.style.opacity = "1";
  }
  else if (testScreen === "birthday") {
    birthdayScreen.style.display = "flex";
    birthdayScreen.style.opacity = "1";
  }
  else if (testScreen === "home") {
    homeScreen.style.display = "block";
    homeScreen.style.opacity = "1";
  }
  else if (testScreen === "photos") {
    photosScreen.style.display = "block";
    photosScreen.style.opacity = "1";
    photosLandingScreen.style.display = "flex";
    photosLandingScreen.style.opacity = "1";
    photosMemoriesScreen.style.display = "none";
  }
  else if (testScreen === "notes") {
    homeScreen.style.display = "block";
    homeScreen.style.opacity = "1";
    notesOverlay.style.display = "flex";
    notesOverlay.style.opacity = "1";
    notesPanel.style.transform = "translateY(0)";
  }
  else if (testScreen === "snapchat") {
    snapchatScreen.style.display = "block";
    snapchatScreen.style.opacity = "1";

    snapchatIntroScreen.style.display = "flex";
    snapchatIntroScreen.style.opacity = "1";
    setTimeout(function () {
      snapchatIntroScreen.style.opacity = "1";
    }, 50);
    setTimeout(function () {
      snapchatIntroScreen.style.opacity = "0";
      setTimeout(function () {
        snapchatIntroScreen.style.display = "none";
        snapchatMainScreen.style.display = "flex";
        snapchatMainScreen.style.opacity = "0";
        setTimeout(function () {
          snapchatMainScreen.style.opacity = "1";
        }, 50);
      }, 400);
    }, 1200);
    snapViewer.style.display = "none";
  }
  else if (testScreen === "spotify") {
    spotifyScreen.style.display = "block";
    spotifyScreen.style.opacity = "1";
    spotifyIntroScreen.style.display = "none";
    spotifyMainScreen.style.display = "flex";
    spotifyMainScreen.style.opacity = "1";

  }
}
