document.addEventListener("DOMContentLoaded", function () {
  const asciiArt = `     ／l、
（ﾟ､ ｡ ７
   l、~ ヽ
  ししと ）ノ`;
  const headlineText = "andro.ink";
  const aboutText = `19
    she/her
    does electronics repairs, microsoldering,
    binary analysis and MCU programming
    soon to earn a vocational qualification in Mechatronics
    somewhat of a data hoarder and a fan of self-hosting`;
  const buttonText = [
    "listening stats",
    "github",
    "works",
    "projects",
    "pronouns.page",
  ];
  const buttonLink = [
    "https://stats.andro.ink",
    "",
    "",
    "",
    "https://en.pronouns.page/@androxyde",
  ];
  const buttonTooltip = ["", "soon™", "soon™", "soon™", ""];

  const asciiContainer = document.querySelector(".ascii");
  const headlineElement = document.getElementById("headline-content");
  const aboutElement = document.getElementById("about-content");
  const linkContainer = document.querySelector(".link-container");
  const statusblock = document.getElementById("statusblock");
  const buttonContainer = document.querySelector(".button-container");
  const validButton = document.querySelector(".valid-buttons");

  const asciiTypingSpeed = 12;
  const headlineTypingSpeed = 20;
  const aboutTypingSpeed = 0;
  const buttonTypingSpeed = 6;

  const asciiDelay = 0;
  const headlineDelay = 500;
  const aboutDelay = 350;
  const buttonsDelay = 350;

  statusblock.style.visibility = "hidden";
  statusblock.style.opacity = 0;
  statusblock.style.transition = "opacity 0.5s ease-out";

  buttonContainer.style.visibility = "hidden";
  buttonContainer.style.opacity = 0;
  buttonContainer.style.transition = "opacity 0.5s ease-out";

  validButton.style.visibility = "hidden";
  validButton.style.opacity = 0;
  validButton.style.transition = "opacity 0.5s ease-out";

  function typeText(text, element, speed, delay, callback) {
    setTimeout(() => {
      let index = 0;

      function type() {
        if (index < text.length) {
          if (text[index] === "\n") {
            element.innerHTML += "<br>";
          } else {
            element.innerHTML += text.charAt(index);
          }
          index++;
          setTimeout(type, speed);
        } else if (callback) {
          callback();
        }
      }

      type();
    }, delay);
  }

  let activeTooltip = null;
  const tooltipCache = new Map();

  document.addEventListener("mousemove", function (e) {
    if (activeTooltip) {
      const offsetX = 1;
      const offsetY = -37.5;
      activeTooltip.style.left = e.pageX + offsetX + "px";
      activeTooltip.style.top = e.pageY + offsetY + "px";
    }
  });

  function typeButtons(
    buttons,
    links,
    tooltips,
    container,
    speed,
    delay,
    callback,
  ) {
    setTimeout(() => {
      let buttonIndex = 0;

      function typeNextButton() {
        if (buttonIndex < buttons.length) {
          const buttonElement = document.createElement("a");
          buttonElement.href = links[buttonIndex];

          if (links[buttonIndex] !== "") {
            buttonElement.href = links[buttonIndex];
            buttonElement.target = "";
          } else {
            buttonElement.onclick = (e) => e.preventDefault();
          }

          buttonElement.className = "links link-button";
          container.appendChild(buttonElement);

          if (tooltips[buttonIndex]) {
            if (!tooltipCache.has(buttonElement)) {
              const tooltipElement = document.createElement("div");
              tooltipElement.className = "tooltip";
              tooltipElement.innerText = tooltips[buttonIndex] || "";
              tooltipElement.style.display = "none";
              document.body.appendChild(tooltipElement);
              tooltipCache.set(buttonElement, tooltipElement);
            }

            buttonElement.addEventListener("mouseenter", function () {
              const tooltipElement = tooltipCache.get(buttonElement);
              activeTooltip = tooltipElement;
              tooltipElement.style.display = "block";
              tooltipElement.style.visibility = "visible";
            });

            buttonElement.addEventListener("mouseleave", function () {
              const tooltipElement = tooltipCache.get(buttonElement);
              tooltipElement.style.visibility = "hidden";
              tooltipElement.style.display = "none";
              activeTooltip = null;
            });
          }

          typeText(buttons[buttonIndex], buttonElement, speed, 0, () => {
            buttonIndex++;
            typeNextButton();
          });
        } else if (callback) {
          callback();
        }
      }

      typeNextButton();
    }, delay);
  }

  function displayaboutText(aboutText, aboutElement, callback) {
    const lines = aboutText.split("\n");
    let lineIndex = 0;

    setTimeout(() => {
      function typeLine() {
        if (lineIndex < lines.length) {
          const lineDiv = document.createElement("div");
          aboutElement.appendChild(lineDiv);

          typeText(lines[lineIndex], lineDiv, aboutTypingSpeed, 0, () => {
            lineIndex++;
            typeLine();
          });
        } else if (callback) {
          callback();
        }
      }

      typeLine();
    }, aboutDelay);
  }

  typeText(asciiArt, asciiContainer, asciiTypingSpeed, asciiDelay, function () {
    typeText(
      headlineText,
      headlineElement,
      headlineTypingSpeed,
      headlineDelay,
      function () {
        displayaboutText(aboutText, aboutElement, function () {
          typeButtons(
            buttonText,
            buttonLink,
            buttonTooltip,
            linkContainer,
            buttonTypingSpeed,
            buttonsDelay,
            function () {
              setTimeout(() => {
                statusblock.style.visibility = "visible";
                statusblock.style.opacity = 1;
                buttonContainer.style.visibility = "visible";
                buttonContainer.style.opacity = 1;
                validButton.style.visibility = "visible";
                validButton.style.opacity = 1;
              }, 500);
            },
          );
        });
      },
    );
  });
});
