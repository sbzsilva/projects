// Check every 30 seconds
const CHECK_INTERVAL = 30000;
let checkTimer = null;

function parseTime(timeString) {
  // Clean up the time string (handle non-breaking spaces and trim)
  const cleaned = timeString.replace(/\u00A0/g, ' ').trim();
  
  // Handle both hh:mm:ss and hh:mm formats
  const parts = cleaned.split(':').map(part => parseInt(part, 10));
  
  if (parts.length < 2 || parts.some(isNaN)) return null;

  let hours = 0, minutes = 0, seconds = 0;
  
  if (parts.length === 3) {
    // hh:mm:ss format
    [hours, minutes, seconds] = parts;
  } else if (parts.length === 2) {
    // hh:mm format
    [hours, minutes] = parts;
  }

  return {
    hours,
    minutes,
    seconds,
    totalSeconds: (hours * 3600) + (minutes * 60) + seconds
  };
}

function handleConfirmation() {
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

  console.log(`Current time remaining: ${timeData.hours}h ${timeData.minutes}m ${timeData.seconds}s`);

  // Check if time is <= 10 minutes (600 seconds)
  if (timeData.totalSeconds <= 600) {
    const startButton = document.getElementById('startawslab');
    if (startButton && !startButton.disabled) {
      console.log('Renewing lab session...');
      startButton.click();
      
      // Handle potential confirmation dialog
      setTimeout(handleConfirmation, 1000);
    }
  }
}

function startMonitoring() {
  if (!checkTimer) {
    checkTimer = setInterval(checkTime, CHECK_INTERVAL);
    console.log('Started lab session monitoring');
    checkTime(); // Run immediately on startup
  }
}

// Initialize
startMonitoring();