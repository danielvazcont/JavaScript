const bells = new Audio('bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const stopBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-restart');
const session = document.querySelector('.minutes'); 
const session2 = document.querySelector('.seconds'); 
const errorText = document.querySelector('.app-message');
/**
 * SONG
 */
const song = new Audio('song.mp3');
song.loop = true; 
const volumen = 0.2; 
song.volume = volumen;
song.play();

/*buttons for add more time*/
const addMinutes = document.getElementsByClassName("btn-arrow");

//add the event listeners to the 4 buttons
for (let i = 0; i < addMinutes.length; i++) {

    addMinutes[i].addEventListener("click", function() {
      if(state) {
          /* The buttons have a common class but with different ids and with that I perform different actions */
          const buttonId = this.id;
          const isMinute = buttonId.includes("mu") || buttonId.includes("md");
          const isIncrement = buttonId.includes("mu") || buttonId.includes("su");//or can be decrement md sd
          const sessionElement = isMinute ? session : session2; //session=minutes session2=seconds
          let value = Number.parseInt(sessionElement.textContent);
          
          if (isIncrement) 
            value = value < 9 ? "0" + (value + 1) : value + 1;
          else 
            value = value <= 10 ? "0" + (value - 1) : value - 1;
          
          
          sessionElement.innerText = (value === 60) ? "00" : (value === 0 || value === "00") ? "59" : value; //a small bug, when it is decremented from 01 to 59 but don't say anything
      }else{
          errorText.innerText="Timer started"
          errorText.style.color="red";

          setTimeout(() => {
            errorText.innerText = "Running...";
            errorText.style.color = "white";
          }, 3000); 
      }
  });

}

let myInterval; 
let state = true;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);
  const sessionAmount2 = Number.parseInt(session2.textContent);
  if(state) {
    errorText.innerText="Running..."
    errorText.style.color="green";
    state = false;
    let totalSeconds = (sessionAmount * 60) + sessionAmount2;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');
    
      totalSeconds--;
    
      let minutesLeft = Math.floor(totalSeconds/60);
      let secondsLeft = totalSeconds % 60;
    
      if(secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`
    
      if(minutesLeft === 0 && secondsLeft === 0) {
        bells.play()
        clearInterval(myInterval);
      }
    }
    myInterval = setInterval(updateSeconds, 1000);
  } else {
          errorText.innerText="Timer started"
          errorText.style.color="red";

          setTimeout(() => {
            errorText.innerText = "Running";
            errorText.style.color = "white";
          }, 3000); 
  }
}

//function to pause the timer
const stopTimer = () => {
  errorText.innerText = "press start to begin";
  errorText.style.color = "white";
  clearInterval(myInterval);
  state = true;
}

//function to reset the timer
const resetTimer = () => {
  session.innerText="25";
  session2.innerText="30";
  stopTimer();
}

startBtn.addEventListener('click', appTimer);
//new Events
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);