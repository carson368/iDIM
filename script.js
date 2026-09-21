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

//birthday screen
const keyButtons = document.querySelectorAll(".keypad button");
const dots = document.querySelectorAll(".dot");
const birthdayScreen = document.querySelector(".birthday-screen");
const confettiSound = document.getElementById("confetti-sound");
const confettiContainer = document.querySelector(".confetti-container");
const continueButton = document.getElementById("continue-button");
const homeScreen = document.querySelector(".home-screen");
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

//photos
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

//notes
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
  "Joydine🍒": [
    {
      type: "image",
      src: "images/googleimages/googlephoto1.jpg",
    },
    {
      type: "video",
      src: "images/snapchat/joydinesnap2.mp4",
    },
  ],
  Luis: [
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

    snapVideo.play();
  }
}

const snapMedia = document.querySelector(".snap-media");

snapMedia.addEventListener("click", function (event) {
  const senderSnaps = snapData[currentSender];

  const tapPosition = event.offsetX;
  const mediaWidth = snapMedia.clientWidth;

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
    fill.style.transition = `width ${videoDuration}s linear`;
    fill.style.width = "100%";
  };

  snapVideo.onended = function () {
    nextSnap();
  };
}

//test screens
const testScreen = "photos";

if (testScreen !== "") {
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
  spotifyScreen.style.display = "none";
  notesOverlay.style.display = "none";
  snapchatScreen.style.display = "none";

  if (testScreen === "lock") {
    phoneContent.style.display = "flex";
  } else if (testScreen === "passcode") {
    passcodeScreen.style.display = "block";
    passcodeScreen.style.opacity = "1";
  } else if (testScreen === "birthday") {
    birthdayScreen.style.display = "flex";
    birthdayScreen.style.opacity = "1";
  } else if (testScreen === "home") {
    homeScreen.style.display = "block";
    homeScreen.style.opacity = "1";
  } else if (testScreen === "photos") {
    photosScreen.style.display = "block";
    photosScreen.style.opacity = "1";
  } else if (testScreen === "notes") {
    homeScreen.style.display = "block";
    homeScreen.style.opacity = "1";
    notesOverlay.style.display = "flex";
    notesOverlay.style.opacity = "1";
    notesPanel.style.transform = "translateY(0)";
  } else if (testScreen === "snapchat") {
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
  } else if (testScreen === "spotify") {
    spotifyScreen.style.display = "block";
    spotifyScreen.style.opacity = "1";
    spotifyIntroScreen.style.display = "none";
    spotifyMainScreen.style.display = "flex";
    spotifyMainScreen.style.opacity = "1";
  }
}
