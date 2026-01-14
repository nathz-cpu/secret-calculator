const display = document.getElementById('display');
const video = document.getElementById('specialVideo');
const calculator = document.getElementById('calculatorContainer');

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(display.value);
        display.value = result;

        // The Secret Code: If result is 2
        if (Number(result) === 2) {
            calculator.style.display = 'none';
            video.style.display = 'block';
            
            // Try to play with sound
            video.muted = false; 
            video.currentTime = 0;
            
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Show controls if the browser blocks auto-unmute
                    video.controls = true;
                });
            }
        }
    } catch (e) {
        display.value = 'Error';
    }
}

// Return to calculator when video ends
video.onended = function() {
    video.style.display = 'none';
    calculator.style.display = 'block';
    display.value = '';
    video.controls = false;
};
