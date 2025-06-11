let currentStopCode = null;

function handleSend(api, uidList, messageList, delay) {
  fetch("/generate-stop-code")
    .then(res => res.json())
    .then(data => {
      currentStopCode = data.code;
      alert("🛑 Stop Code: " + currentStopCode);

      fetch("/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uidList, messageList, delay })
      })
      .then(res => res.text())
      .then(msg => {
        log(`🚀 ${msg}`);
      });
    });
}

function stopSendingManually() {
  const input = prompt("Enter 6-digit stop code:");
  if (input === currentStopCode) {
    fetch("/stop", { method: "POST" });
    log("🛑 Sending stopped by user.");
  } else {
    alert("❌ Incorrect stop code");
  }
}

function log(msg) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += `<div>${msg}</div>`;
}
