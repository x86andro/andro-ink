import Tooltip from "./tooltip.js";

document.addEventListener("DOMContentLoaded", function () {
  const buttonFolder = "img/buttons/";
  const buttonWidth = 88;
  const buttonHeight = 31;

  const imageData = [
    [
      { src: "d30c6e605f6c_trans_fl.png", tooltip: "transgender" },
      { src: "panromantic.png", tooltip: "panromantic" },
      { src: "fdb27094584d_ace_fl.png", tooltip: "asexual" },
      {
        src: "d1a125e05f09_rainbow_fl.png",
        tooltip: "be proud of who you are",
      },
    ],
    [
      {
        src: "righttorepair.jpg",
        link: "https://en.wikipedia.org/wiki/Right_to_repair",
        tooltip: "I support right to repair",
      },
      {
        src: "archlinux.gif",
        link: "https://archlinux.org/",
        tooltip: "my OS of choice",
      },
      {
        src: "powered-by-debian.gif",
        link: "https://www.debian.org/",
        tooltip: "this site runs on debian",
      },
      { src: "linuxnow.gif", tooltip: "be free, use linux" },
      {
        src: "nano2.gif",
        link: "https://www.nano-editor.org/",
        tooltip: "nano > vi",
      },
      { src: "stop-microsoft.gif", tooltip: "stop microsoft!" },
      {
        src: "copy_floppy.gif",
        tooltip: "backups — you should have them",
      },
      { src: "ipv6-ready.png", tooltip: "this site is IPv6 ready" },
    ],
    [
      { src: "cssdif.gif", tooltip: "sometimes it really is" },
      { src: "js-warning.gif", tooltip: "contains javascript!" },
      {
        src: "andro-ink.png",
        tooltip: "this site's button",
      },
      {
        src: "IA.gif",
        link: "https://web.archive.org/",
        tooltip: "help to preserve the internet",
      },
      {
        src: "bestviewed16bit.gif",
        tooltip: "best viewed on: anything with a screen",
      },
      {
        src: "piracy.gif",
        tooltip: "if buying isn't owning, then piracy isn't stealing",
      },
      { src: "paws.png", tooltip: ":3" },
      {
        src: "queercode.png",
        tooltip: "you're telling me a queer coded this?",
      },
    ],
  ];

  const rowContainers = [
    document.querySelector(".button-row-1"),
    document.querySelector(".button-row-2"),
    document.querySelector(".button-row-3"),
  ];

  const tooltip = new Tooltip();

  imageData.forEach((images, index) => {
    createButtons(images, rowContainers[index]);
  });

  function createButtons(images, container) {
    images.forEach((image) => {
      const buttonParent = image.link
        ? createLinkElement(image.link)
        : document.createElement("div");
      const button = createButton(image);

      buttonParent.appendChild(button);
      container.appendChild(buttonParent);

      if (image.tooltip) {
        addTooltipToElement(button, image.tooltip);
      }
    });
  }

  function createLinkElement(link) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    return anchor;
  }

  function createButton(image) {
    const button = document.createElement("img");
    button.src = `${buttonFolder}${image.src}`;
    button.width = buttonWidth;
    button.height = buttonHeight;
    button.className = "button";
    return button;
  }

  function addTooltipToElement(element, tooltipText) {
    element.addEventListener("mouseenter", () => tooltip.show(tooltipText));
    element.addEventListener("mouseleave", () => tooltip.hide());
  }

  const tooltipElements = [
    { selector: ".ascii", tooltipText: "meow" },
    { selector: ".refresh-icon", tooltipText: "ping again" },
  ];

  tooltipElements.forEach((item) => {
    const element = document.querySelector(item.selector);
    if (element) {
      addTooltipToElement(element, item.tooltipText);
    }
  });
});
