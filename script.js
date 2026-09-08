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
