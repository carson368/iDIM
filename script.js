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

const notificationSound = document.getElementById("notification-sound");
const ringtoneSound = document.getElementById("ringtone-sound");
const callAudio = document.getElementById("call-audio");

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
    // Play the "Access Denied" shake animation
    enterButton.classList.add("shake");

    // Remove the class after the animation finishes so it can be triggered again
    setTimeout(function () {
      enterButton.classList.remove("shake");
    }, 400);

    return; // STOP the function here. Do not proceed to the next screen.
  }

  // 2. If the date has passed, proceed normally!
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

  phoneScreen.style.display = "block";
  phoneScreen.style.opacity = "1";
  phoneContent.style.display = "flex";

  verificationScreen.style.opacity = "0";

  setTimeout(function () {
    verificationScreen.style.display = "none";
  }, 800);
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

            // Match the blackout state initially
            birthdayScreen.classList.add("dimmed");
            birthdayScreen.style.opacity = "1";

            // 2. The Burst: Remove blackout, play audio, launch confetti
            setTimeout(function () {
              birthdayScreen.classList.remove("dimmed");
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
      src: "images/snapchat/joydinesnap1.jpg",
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

  ],
  "Sweeney♥!": [
    {
      type: "image",
      src: "images/snapchat/sweeneysnap1.png",
    },
    {
      type: "image",
      src: "images/snapchat/sweeneysnap2.jpg",
    },
  ],
  "Adora❤️": [
    {
      type: "image",
      src: "images/snapchat/adorasnap1.jpg",
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
  trackAppOpen("whatsapp"); // Hide the home screen immediately to prevent it showing behind WhatsApp 
  homeScreen.style.opacity = "0"; homeScreen.style.display = "none"; // Show the WhatsApp app wrapper immediately 
  whatsappScreen.style.display = "block"; whatsappScreen.style.opacity = "1"; // Hide the chat screens until the splash screen finishes 
  chatListScreen.style.display = "none";
  chatViewScreen.style.display = "none"; // Display the WhatsApp splash screen immediately 
  whatsappSplashScreen.style.display = "flex";
  whatsappSplashScreen.style.opacity = "1"; // Keep the splash screen visible briefly, then show the chat list 
  setTimeout(function () {
    whatsappSplashScreen.style.opacity = "0";
    setTimeout(function () {
      whatsappSplashScreen.style.display = "none";
      chatListScreen.style.display = "flex";
    }, 300);
  }, 1200);
});
// 2. Chat List -> Home Screen
listBackButton.addEventListener("click", function () { // Hide WhatsApp immediately to prevent the old screen showing through 
  whatsappScreen.style.opacity = "0";
  whatsappScreen.style.display = "none"; // Reset WhatsApp screens for the next time it opens 
  whatsappSplashScreen.style.display = "none";
  whatsappSplashScreen.style.opacity = "0";
  chatListScreen.style.display = "none";
  chatViewScreen.style.display = "none"; // Restore the home screen cleanly 
  homeScreen.style.display = "block";
  homeScreen.style.opacity = "1";
});
// ========================================
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
        <p>Hey Steph, I made something for you👀.</p>
        <span class="timestamp">20:58 PM</span>
      </div>
      <div class="chat-bubble sent">
        <p>Heyy, what's it?🥲</p>
        <span class="timestamp">21:09 PM</span>
      </div>
      <div class="chat-bubble received">
        <p>I guess you'll have to wait until tomorrow😂</p>
        <span class="timestamp">21:14 PM</span>
      </div>
      <div class="chat-bubble sent">
        <p>brooo😭what is it? </p>
        <span class="timestamp">21:16 PM</span>
      </div>
      <div class="chat-bubble received">
        <p>Just a few more hours😂</p>
        <span class="timestamp">21:21 PM</span>
      </div>
      <div class="chat-bubble sent">
        <p>smh...I hate you</p>
        <span class="timestamp">21:23 PM</span>
      </div>
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>Happy Birthday Joy🥳❤️</p>
        <span class="timestamp">00:21 AM</span>
      </div>
      <div class="chat-bubble received">
        <p>Today is the day you finally turn 21🥳 To celebrate this, i wanted to do something different for you this time.💖 Rather than just sending you a birthday message or just  buying you something, I wanted to make this simple experience for you, something you could  explore for yourself rather than just look at and forget. I hope this experience makes you laugh and brightens your day. And honestly i hope that whenever you look back on it, you rememberr that you are special and we all love you.🩵  </p>
        <span class="timestamp">00:22 AM</span>
      </div>
      <div class="chat-bubble received">
        <p>You deserve to feel celebrated today and always! So take your time with it, explore and indulge yourself. Happy birthday🥳🩵</p>
        <span class="timestamp">00:23 AM</span>
      </div>
      <div class="chat-bubble received">
        <p>Anyway, I've said enough😂</p>
        <span class="timestamp">00:24 AM</span>
      </div>
      `
  },

  "Joydine": {
    avatar: "images/whatsapp/joydine.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>Happy Birthday Steph!! I'm so glad we met. [Insert Joydine's secret paragraph here]</p>
        <span class="timestamp">00:21 AM</span>
      </div>`
  },

  "Adora": {
    avatar: "images/whatsapp/adora.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>My bundle of Joy❤️A happy and prosperous birthday to you. 

3 years of friendship with you has been nothing but vibes, laughter, love and cheering for each other… I appreciate you and I’m glad I call you my friend. Thank you for always listening to me even when I sound like a broken record, thank you for wiping my tears every single time I was feeling down, thank you for being a considerate and supportive friend when I had to perform, model, or plan events you were always there for me 

I genuinely cherish you, the God I worship will never forsake you
May the joy you have never end, you will always be healthy, wealthy and loved 🥰my favorite Kenyan girl.

With love,
Adora.</p>
        <span class="timestamp">00:21 AM</span>
      </div>`
  },

  "Luis": {
    avatar: "images/whatsapp/luis.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>Hii Joy😊Having you as a friend is such a beautiful blessing, and I honestly don’t know what I’d do without you. ❤️ You’re one of those rare people who make life a little brighter just by being in it. Thank you for the laughter, the love, the support, and all the little moments that mean more than words can explain. I’m so grateful to have someone like you in my life, someone I can laugh with, talk to, and create beautiful memories with. No matter where life takes us, I hope you always remember how special you are and how much you mean to me. You’re more than just a friend; you’re a little piece of happiness in my world, and I’ll always cherish you. 🥹💕Happy birthday!</p>
        <span class="timestamp">00:21 AM</span>
      </div>`
  },

  "Sweeney": {
    avatar: "images/whatsapp/sweeney.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>To my best friend, my girl, my person ❤️🥹

Happy birthday to one of the most important people in my life! ❤️🎂

Honestly, I don’t even know where to begin because how do you put years of friendship, love, memories, laughter, tears, misunderstandings, and so many emotions into just one letter? How do I explain to someone how much they mean to me when I sometimes struggle to find the right words? But since today is your day, wacha nijaribu.

We’ve been friends since 2019, and when I think about that, I can’t help but smile. 2019 feels like such a long time ago, yet somehow, here we are, still connected after everything life has put us through. We’ve grown, changed, experienced different things, and become different versions of ourselves, but one thing I will always be grateful for is that our story didn’t end when things between us became difficult.

You know, one thing about life is that it doesn’t always allow us to have perfect relationships. Sometimes we misunderstand each other, sometimes we hurt each other without intending to, and sometimes things happen that create distance between people who once felt inseparable. And I think our friendship has taught me that love and friendship aren’t always about having everything right all the time. Sometimes they’re about finding your way back, learning from what happened, and choosing to appreciate the connection you still have.


I’m not saying that falling out was a good thing, because I would never wish to lose you for that long again( the one year break we heard).But I’m grateful that our story had another chapter. I’m grateful that the distance wasn’t the end of everything we had built. I’m grateful that we got another chance to create memories, laugh together, talk again, and continue being part of each other’s lives. It reminds me that some connections are worth appreciating deeply, especially when you realise that you could have lost them for good.</p>
        <span class="timestamp">00:21 AM</span>
      </div>
      <div class="chat-bubble received">
        <p>And if I’m being completely honest, I’m glad it’s you. I’m glad that after everything, I can still call you my friend. I’m glad that the girl I’ve known since 2019 is still someone I get to celebrate today. There is something so special about having someone in your life for years, someone who has known you through different seasons, different moods, different experiences, and different versions of yourself. And even though we may not be the same people we were when we first became friends, I will always appreciate the history we share.

I want you to know that I genuinely love you. Not just because it’s your birthday and I’m supposed to say nice things, but because you really do mean something to me. Your place in my life is not something I take lightly. You’re someone with whom I share a part of my life story, someone whose existence has mattered to me for years, and someone I am truly happy to have found my way back to.

I hope you know how special you are, not just to me but to the people who get the privilege of knowing the real you. I hope you never feel like you have to become someone else to be worthy of love. I hope you always remember that you deserve kindness, happiness, peace, genuine friendships, and the kind of love that doesn’t leave you questioning your worth. You deserve to be celebrated, not only on your birthday but on the ordinary days too. You deserve people who see the beauty in you, who encourage you when you’re doubting yourself, who celebrate your wins without jealousy, and who remind you of your strength when life gets difficult.

As you enter another year of your life, I pray that this new chapter brings you so much happiness that your heart feels full. I pray that the things you’ve been quietly wishing for finally begin to happen. May you experience opportunities that bring out the best in you, meet people who genuinely care about you, and find yourself in places where you feel appreciated and understood. May you have the courage to pursue everything you want, the strength to overcome whatever tries to discourage you, and the wisdom to walk away from anything that no longer brings you peace.
</p>
        <span class="timestamp">10:45 AM</span>
      </div>
      <div class="chat-bubble received">
        <p>
I pray that God protects you, guides your steps, and gives you the strength you need for every season ahead. May He open doors for you that you never imagined would open, bless the work of your hands, and give you reasons to smile even on the days when life feels overwhelming. May your heart be protected from unnecessary pain, and may you never have to beg for the love, respect, or friendship you deserve. I pray that this year is gentle with you, that it gives you room to grow, and that it brings you closer to the woman you’re becoming.

And please, never forget to be proud of yourself. Even for the little things. Even for the days when all you managed to do was get through the day. I hope this year reminds you of your own strength. I hope you learn to celebrate yourself the way you celebrate other people. I hope you give yourself grace when things don’t go according to plan, and I hope you never stop believing that beautiful things are still possible for you.

I also hope that we continue to make more memories together. We have so many years behind us, but I hope we still have so many more ahead of us. I hope we get to laugh about the most ridiculous things, have conversations that last for hours, celebrate each other’s milestones, support each other through difficult seasons, and look back one day at how far we’ve come. I hope we get to see each other grow into the people we’ve always wanted to become. I hope that years from now, we’ll still be able to look at each other and smile because, despite all the changes life brought, we managed to preserve something beautiful between us.
</p>
        <span class="timestamp">00:21 AM</span>
      </div>
      <div class="chat-bubble received">
        <p>If there is anything I want you to take away from this letter, it is this: I’m genuinely grateful that you exist, and I’m grateful that you’re still my friend. Out of all the people I’ve met in this life, you’re someone whose presence I will always appreciate. Our friendship has had its beautiful moments and its difficult ones, but it is a part of my life that I will always hold close to my heart.

Thank you for being part of my story since 2019. Thank you for the memories we have made, for the moments we’ve shared, and for the chance to continue this friendship after everything. Even if I don’t always say it, and even if I sometimes struggle to express how I feel, please know that there is so much love behind the simple words, “You’re my best friend.”

Today, I hope you feel celebrated in every possible way. I hope you laugh until your stomach hurts, smile until your cheeks ache, and feel surrounded by the love you deserve. I hope you look at this new age with excitement, knowing that there is still so much life waiting for you to experience. You have so many beautiful things ahead of you, and I genuinely cannot wait to see you experience them.

Happy birthday,kajoyo ❤️</p>
        <span class="timestamp">00:21 AM</span>
      </div>`
  },

  "Amani": {
    avatar: "images/whatsapp/amani.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>Heey ml , I want to wish you a happy happy birthday , words cant explain how much I love you , God really knew how much I really needed you in this period of my campus life , youve really healed parts of me I cant explain , when I count my blessings I count you ❤️I want you to know youre loved and cared for , forever and ever ml , I pray for you , I want the best for you and you mean so much to me ❤️I love you and happy birthday my love❤️
Regards 
Amani❤️</p>
        <span class="timestamp">11:10 AM</span>
      </div>`
  },
  "Mikey": {
    avatar: "images/whatsapp/mikey.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>[Insert Mikey's secret paragraph here] 🎉</p>
        <span class="timestamp">00:21 AM</span>
      </div>`
  },
  "Immah": {
    avatar: "images/whatsapp/immah.png",
    messages: `
      <div class="chat-date">Today</div>
      <div class="chat-bubble received">
        <p>[Insert Immah's secret paragraph here] 🎉</p>
        <span class="timestamp">00:21 AM</span>
      </div>`
  }
};

// ========================================
// AUTOMATIC CHAT PREVIEW POPULATOR
// ========================================
function updateChatPreviews() {
  const chatListItems = document.querySelectorAll(".chat-list-item");

  chatListItems.forEach(function (row) {
    const nameTag = row.querySelector(".chat-list-top strong");
    const previewP = row.querySelector(".chat-list-bottom p");

    if (!nameTag || !previewP) return;

    const contactName = nameTag.textContent.trim();

    if (whatsappData[contactName]) {
      // Create a temporary hidden container to parse the message string
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = whatsappData[contactName].messages;

      // Find all message text paragraphs inside chat bubbles
      const messageBubbles = tempDiv.querySelectorAll(".chat-bubble p");

      if (messageBubbles.length > 0) {
        // Grab the text of the very last message in the thread
        const lastMessageText = messageBubbles[messageBubbles.length - 1].textContent.trim();
        previewP.textContent = lastMessageText;
      }
    }
  });
}

// Call function immediately on load
updateChatPreviews();

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

    if (notificationSound) {
      notificationSound.currentTime = 0;
      notificationSound.play().catch(error => {
        console.log("sound error", error);
      })
    }

    // Hide it automatically after 4 seconds
    setTimeout(() => {
      secretNotification.classList.remove("show");
    }, 2500);
  }, randomDelay);
}

let wasMusicPlayingBeforeCall = false;
function triggerIncomingCall() {
  hasTriggeredCall = true;
  const randomDelay = Math.floor(Math.random() * 3000) + 3000;

  if (musicPlayer && !musicPlayer.paused) {
    wasMusicPlayingBeforeCall = true;
    musicPlayer.pause();
  }

  setTimeout(() => {
    incomingCallScreen.classList.add("show");

    if (callAudio) {
      callAudio.load();
    }

    if (ringtoneSound) {
      ringtoneSound.currentTime = 0;
      ringtoneSound.play().catch((err) => console.log("Ringtone audio error:", err));
    }
  }, randomDelay);
}
// ========================================
// GLOBAL DIRECTOR: INCOMING & ONGOING CALL
// ========================================

const acceptCallBtn = document.querySelector(".ios-accept-btn");
const declineCallBtn = document.querySelector(".ios-decline-btn");
const callerTypeEl = document.querySelector(".ios-caller-type");

let callTimerInterval = null;
let callSeconds = 0;

// Format seconds into MM:SS
function formatCallDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// 1. Accept Call Action
if (acceptCallBtn) {
  acceptCallBtn.addEventListener("click", function () {

    if (ringtoneSound) {
      ringtoneSound.pause();
      ringtoneSound.currentTime = 0;
    }
    // Expand call banner to ongoing state
    incomingCallScreen.classList.add("active-call");

    // Initialize timer state
    callSeconds = 0;
    if (callerTypeEl) {
      callerTypeEl.classList.add("ios-call-timer");
      callerTypeEl.textContent = "00:00";
    }

    // Start live timer
    clearInterval(callTimerInterval);
    callTimerInterval = setInterval(function () {
      callSeconds++;
      if (callerTypeEl) {
        callerTypeEl.textContent = formatCallDuration(callSeconds);
      }
    }, 1000);

    // Play recording audio
    if (callAudio) {
      callAudio.currentTime = 0;
      callAudio.onended = finishCallWithDelay;

      setTimeout(() => {
        const playPromise = callAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.error("Call audio failed to play:", err);
          });
        }
      }, 100);
    }
  });
}

// 2. End / Decline Call Action
// Function to wrap up the call with a realistic "Call Ended" delay
function finishCallWithDelay() {
  if (callAudio) {
    callAudio.pause();
  }
  clearInterval(callTimerInterval);
  callTimerInterval = null;

  if (callerTypeEl) {
    callerTypeEl.classList.remove("ios-call-timer");
    callerTypeEl.classList.add("ios-call-ended");
    callerTypeEl.textContent = "Call Ended";
  }

  setTimeout(function () {
    incomingCallScreen.classList.remove("show");

    setTimeout(function () {
      incomingCallScreen.classList.remove("active-call");
      if (callerTypeEl) {
        callerTypeEl.classList.remove("ios-call-ended");
        callerTypeEl.textContent = "mobile";
      }

      // START THE FINALE SEQUENCE HERE!
      triggerFinaleSequence();

    }, 400);
  }, 2000);
}


// ========================================
// FINALE SEQUENCE ORCHESTRATOR
// ========================================

let hasFinaleTriggered = false;

function triggerFinaleSequence() {
  if (hasFinaleTriggered) return;
  hasFinaleTriggered = true;

  const batteryModal = document.getElementById("battery-alert-modal");
  const batteryOkBtn = document.getElementById("battery-ok-btn");
  const shutdownScreen = document.getElementById("shutdown-screen");
  const finalRevealScreen = document.getElementById("final-reveal-screen");
  const blackTransitionScreen = document.getElementById("black-transition-screen");

  // Phase 1: Wait 1.2 seconds, then show the low-battery alert.
  setTimeout(() => {
    if (batteryModal) batteryModal.classList.add("show");


    const proceedToShutdown = () => {
      if (batteryModal) batteryModal.classList.remove("show");

      // Phase 2: Pause before showing the shutdown screen.
      setTimeout(() => {
        if (shutdownScreen) shutdownScreen.classList.add("show");

        if (homeScreen) homeScreen.style.display = "block";

        // Phase 3: Keep the Apple shutdown screen visible for 8 seconds.
        setTimeout(() => {
          // Phase 4: Cover everything with solid black.
          if (blackTransitionScreen) {
            blackTransitionScreen.classList.add("show");
          }

          // Hide the shutdown screen beneath the black cover.
          if (shutdownScreen) {
            shutdownScreen.classList.remove("show");
          }

          // Allow the black screen to cover the transition briefly.
          setTimeout(() => {
            if (finalRevealScreen) {
              finalRevealScreen.classList.add("show");
            }

            if (typeof createConfetti === "function") {
              createConfetti();
            }

            // Remove the black cover after the final screen begins appearing.
            setTimeout(() => {
              if (blackTransitionScreen) {
                blackTransitionScreen.classList.remove("show");
              }
            }, 650);

          }, 9000);

        }, 4000);
      }, 6000);
    };

    // Automatically continue if the user doesn't close the alert.
    const autoAdvanceTimer = setTimeout(proceedToShutdown, 3500);

    if (batteryOkBtn) {
      batteryOkBtn.onclick = () => {
        clearTimeout(autoAdvanceTimer);
        proceedToShutdown();
      };
    }


  }, 1200);
}
// Immediate hangup if the user manually presses the red button
function endCallImmediately() {

  if (ringtoneSound) {
    ringtoneSound.pause();
    ringtoneSound.currentTime = 0;
  }
  if (callAudio) {
    callAudio.pause();
    callAudio.currentTime = 0;
  }
  clearInterval(callTimerInterval);
  callTimerInterval = null;
  callSeconds = 0;

  incomingCallScreen.classList.remove("show");

  setTimeout(function () {
    incomingCallScreen.classList.remove("active-call");
    if (callerTypeEl) {
      callerTypeEl.classList.remove("ios-call-timer", "ios-call-ended");
      callerTypeEl.textContent = "mobile";
    }
    triggerFinaleSequence();
  }, 10000);
}

// Listeners
if (callAudio) {
  callAudio.onended = finishCallWithDelay;
}

if (declineCallBtn) {
  declineCallBtn.addEventListener("click", endCallImmediately);
}
const fullscreenBtn = document.getElementById("fullscreen-btn");

if (fullscreenBtn) {
  fullscreenBtn.addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.log("Full-screen mode is unavailable:", error);
    }
  });
}

// Function to request fullscreen mode across browsers
function enterFullScreen() {
  const docEl = document.documentElement;
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.webkitRequestFullscreen) { /* Safari / iOS */
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) { /* IE/Edge */
      docEl.msRequestFullscreen();
    }
  }
}

// Attach event listener to all full-screen prompt buttons
document.querySelectorAll(".fullscreen-prompt-btn").forEach(button => {
  button.addEventListener("click", enterFullScreen);
});


//test screens
const testScreen = "";

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
  else if (testScreen === "whatsapp") {
    whatsappScreen.style.display = "block";
    whatsappScreen.style.opacity = "1";

    // Bypass the splash screen so you don't have to wait for it on every reload
    whatsappSplashScreen.style.display = "none";
    chatListScreen.style.display = "flex";
    chatViewScreen.style.display = "none";
  }
  else if (testScreen === "warning") {
    // 1. Render the phone screen and home screen in the background
    phoneScreen.style.display = "block";
    phoneScreen.style.opacity = "1";
    homeScreen.style.display = "block";
    homeScreen.style.opacity = "1";

    // 2. Instantly trigger the finale sequence starting with the 1% battery warning
    triggerFinaleSequence();
  }
}
