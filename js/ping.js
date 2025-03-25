const urls = [
  {
    url: "https://status.andro.ink",
    ping_id: "ping-1",
    status_id: "status-1",
  },
  {
    url: "https://cloud.andro.ink",
    ping_id: "ping-2",
    status_id: "status-2",
  },
  {
    url: "https://jukebox.andro.ink",
    ping_id: "ping-3",
    status_id: "status-3",
  },
  {
    url: "https://stats.andro.ink",
    ping_id: "ping-4",
    status_id: "status-4",
  },
];

let timeSincePing = 0;

async function ping() {
  for (const { url, ping_id, status_id } of urls) {
    const pingCell = document.getElementById(ping_id);
    const statusCell = document.getElementById(status_id);

    pingCell.innerHTML = "";
    statusCell.innerHTML = "";

    try {
      const startTime = performance.now();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(url, {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const endTime = performance.now();
      const ping = Math.round(endTime - startTime);
      pingCell.textContent = "[ " + ping + "ms ]";
    } catch (error) {
      const errorImg = document.createElement("img");
      errorImg.src = "img/status/icons/unavailable.png";
      errorImg.alt = "";
      errorImg.classList.add("icon");
      pingCell.appendChild(errorImg);
    }
  }
}

function pingCooldown() {
  const now = Date.now();
  if (now - timeSincePing >= 750) {
    timeSincePing = now;
    ping();
  }
}

document
  .getElementById("refresh-icon-id")
  .addEventListener("click", pingCooldown);

window.onload = function () {
  ping();
  setTimeout(ping, 3600);
};
