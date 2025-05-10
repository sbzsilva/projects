// Check every 30 seconds
const CHECK_INTERVAL = 30000;
let checkTimer = null;

function parseTime(timeString) {
  const parts = timeString.trim().split(':').map(part => parseInt(part, 10));
  if (parts.length !== 3) return null;
  return {
    hours: parts[0],
    minutes: parts[1],
    seconds: parts[2],
    totalSeconds: parts[0] * 3600 + parts[1] * 60 + parts[2]
  };
}

function handleConfirmation() {
  // Try to find and click confirmation buttons
  const confirmButtons = [
    ...document.querySelectorAll('button:not([disabled])'),
  ].filter(btn => btn.textContent.toLowerCase().includes('confirm'));

  if (confirmButtons.length > 0) {
    confirmButtons[0].click();
    console.log('Confirmation dialog handled');
  }
}

function checkTime() {
  const timeElement = document.getElementById('awsstimetxtS');
  if (!timeElement) return;

  const timeData = parseTime(timeElement.textContent);
  if (!timeData) return;

  console.log(`Current time remaining: ${timeData.hours}:${timeData.minutes}:${timeData.seconds}`);

  // Check if time is <= 10 minutes
  if (timeData.totalSeconds <= 600) {
    const startButton = document.getElementById('startawslab');
    if (startButton && !startButton.disabled) {
      console.log('Renewing lab session...');
      startButton.click();
      
      // Handle potential confirmation dialog after 1 second
      setTimeout(handleConfirmation, 1000);
    }
  }
}

// Start monitoring
function startMonitoring() {
  if (!checkTimer) {
    checkTimer = setInterval(checkTime, CHECK_INTERVAL);
    console.log('Started lab session monitoring');
  }
}

// Initialize
startMonitoring();