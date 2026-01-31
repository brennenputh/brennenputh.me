const modules = document.getElementsByClassName("module-card");

const updateCards = () => {
  const passfail = document.getElementById("passfail");
  passfail.getElementsByClassName("passes")[0].textContent = passes;
  passfail.getElementsByClassName("fails")[0].textContent = total - passes;
  const ratio = !isNaN(passes / total)
    ? Math.round((passes / total) * 100) / 100
    : 0;
  passfail.getElementsByClassName("ratio")[0].textContent = ratio;

  const timerEl = document.getElementById("timer");

  if (pastTimes.length > 0) {
    let averageTime = pastTimes.reduce((a, b) => a + b) / pastTimes.length;
    timerEl.getElementsByClassName("averageTime")[0].textContent =
      (Math.round(averageTime * 100) / 100).toFixed(2) + "s";
  }

  if (bestTime !== Infinity) {
    timerEl.getElementsByClassName("bestTime")[0].textContent =
      (Math.round(bestTime * 100) / 100).toFixed(2) + "s";
  }

  timerEl.getElementsByClassName("curTime")[0].textContent =
    (Math.round(currentTime * 100) / 100).toFixed(2) + "s";
};

function triggerTimerPass() {
  clearInterval(timerIntervalId);
  timerIntervalId = null;

  pastTimes.push(currentTime);
  if (pastTimes.length > 10) {
    delete pastTimes[0];
  }

  if (currentTime < bestTime) {
    bestTime = currentTime;
  }
}

let passes = 0;
let total = 0;

let timerIntervalId;
let currentTime = 0;
let bestTime = Infinity;
let pastTimes = [];

document.addEventListener("keyup", (event) => {
  // Passfail
  switch (event.key) {
    case "p":
      passes += 1;
      total += 1;
      if (timerIntervalId != null) {
        triggerTimerPass();
      }
      break;
    case "f":
      total += 1;
      if (timerIntervalId != null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
      }
      break;
    case "a":
      if (timerIntervalId != null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
      }
      break;
    case "u":
      pastTimes.pop();
      bestTime = Math.max(...pastTimes);
      currentTime = 0;
      passes -= 1;
      total -= 1;
      break;
    case " ":
      if (timerIntervalId != null) {
        passes += 1;
        total += 1;
        triggerTimerPass();
        clearInterval(timerIntervalId);
        break;
      }
      currentTime = 0;
      timerIntervalId = setInterval(() => {
        currentTime += 0.01;

        const timerEl = document.getElementById("timer");

        timerEl.getElementsByClassName("curTime")[0].textContent =
          (Math.round(currentTime * 100) / 100).toFixed(2) + "s";
      }, 10);
  }

  updateCards();
});
