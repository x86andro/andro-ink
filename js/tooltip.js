class Tooltip {
  constructor() {
    this.tooltipElement = document.createElement("div");
    this.tooltipElement.className = "tooltip";
    document.body.appendChild(this.tooltipElement);

    this.offsetX = 1;
    this.baseOffsetY = 10;
    this.visible = false;
    this.initEvents();
  }

  initEvents() {
    document.addEventListener("mousemove", (e) => {
      if (this.visible) {
        this.updatePosition(e.pageX, e.pageY);
      }
    });
  }

  updatePosition(mouseX, mouseY) {
    const tooltipWidth = this.tooltipElement.offsetWidth;
    const tooltipHeight = this.tooltipElement.offsetHeight;

    let topPosition = mouseY - tooltipHeight - this.baseOffsetY;
    let leftPosition = mouseX + this.offsetX;

    if (leftPosition < 0) {
      leftPosition = 5;
    }

    this.tooltipElement.style.left = `${leftPosition}px`;
    this.tooltipElement.style.top = `${topPosition}px`;
  }

  show(content, mouseX, mouseY) {
    if (this.tooltipElement.textContent !== content) {
      this.tooltipElement.textContent = content;
    }

    this.tooltipElement.style.display = "block";
    this.updatePosition(mouseX, mouseY);

    if (!this.visible) {
      this.tooltipElement.style.visibility = "visible";
      this.visible = true;
    }
  }

  hide() {
    if (this.visible) {
      this.tooltipElement.textContent = "";
      this.tooltipElement.style.visibility = "hidden";
      this.tooltipElement.style.display = "none";
      this.visible = false;
    }
  }
}

export default Tooltip;
