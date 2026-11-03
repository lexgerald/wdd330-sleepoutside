
const countdownElement = document.getElementById("countdown");
const startButton = document.getElementById("startButton");

let intervalId;
let timeoutId;

startButton.addEventListener("click", function () {
    let timeLeft = 10;

    startButton.disabled = true;
    countdownElement.textContent = timeLeft;

    // Decrease the countdown every second
    intervalId = setInterval(function () {
        timeLeft--;
        countdownElement.textContent = timeLeft;
    }, 1000);

    // Stop the countdown after 10 seconds
    timeoutId = setTimeout(function () {
        clearInterval(intervalId);
        countdownElement.textContent = "Time's up!";
        startButton.disabled = false;
    }, 10000);
});
