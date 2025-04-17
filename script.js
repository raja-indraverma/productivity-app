const inputBox = document.getElementById("input-box");

const listBox = document.getElementById("list-container");




function addTask(){
	if(inputBox.value === ''){
		alert("abe gandmare kuch likh toh de");
	}
	else{
		let li = document.createElement("li");
		li.innerHTML = inputBox.value;
		listBox.appendChild(li);
		let span = document.createElement("span");
		span.innerHTML = "\u00d7";
		li.appendChild(span);
		
	}
	inputBox.value = '';
	saveData();

}

listBox.addEventListener("click", function(e){
	if(e.target.tagName == "LI"){
		e.target.classList.toggle("checked");
		saveData();
	}
	else if(e.target.tagName == "SPAN"){
		e.target.parentElement.remove();
		saveData();
	}
}, false);

function saveData(){
	localStorage.setItem("data", listBox.innerHTML);
}

function showTask(){
	listBox.innerHTML = localStorage.getItem("data");
}

showTask();

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function updateTime() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      const dayName = dayNames[now.getDay()];          
		const monthName = monthNames[now.getMonth()];    
		const date = now.getDate();                      
		const year = now.getFullYear(); 
      // Pad with zeros if needed
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
      document.getElementById('date').innerHTML = `${date} ${monthName} ${year} , ${dayName}`;
     }
setInterval(updateTime, 1000);
updateTime(); //



const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');

// const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const clockDisplay = document.getElementById('timer');

let timerInterval = null;

function pad(num) {
  return num.toString().padStart(2, '0');
}

function disableInputs(disabled) {
  hoursInput.disabled = disabled;
  minutesInput.disabled = disabled;
  // secondsInput.disabled = disabled;
  startBtn.disabled = disabled;
}

startBtn.addEventListener('click', function() {

  // Get input values and convert to numbers
  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = 0;

  // Calculate total seconds
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    clockDisplay.textContent = "00:00:00";
    return;
  }
  disableInputs(true);
  // hoursInput.innerHTML = '';
// 	minutesInput.innerHTML = '';
// 	secondsInput = '';
  function updateTimer() {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      clockDisplay.textContent = "00:00:00";
      disableInputs(false);
      playAlarmAndAlert();
      return;
    }

    // Calculate current h, m, s
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    clockDisplay.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
    totalSeconds--;
  }

  updateTimer(); // Initial display

  timerInterval = setInterval(updateTimer, 1000);
});

function playAlarmAndAlert() {
  const audio = document.getElementById('alarm-audio');
  audio.currentTime = 3;
  audio.play();


  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 10000); 
}