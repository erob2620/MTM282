var hours,minutes,seconds,timer;
var lapDiv, timerDiv, controlDiv;
var hourSpan, minuteSpan, secondSpan, millisecondSpan;
var startButton, stopButton, resetButton, lapButton;

function addTimer() {
	var colonNode = document.createTextNode(":");
	var periodNode = document.createTextNode(".");
	var mainDiv = document.getElementById('mainDiv');

	timerDiv = document.createElement("div");
	timerDiv.id = 'timerDiv';
	hourSpan = document.createElement("span");
	hourSpan.id = 'hours';
	hourSpan.innerHTML = "00";

	minuteSpan = document.createElement("span");
	minuteSpan.id = 'minutes';
	minuteSpan.innerHTML = "00";

	secondSpan = document.createElement("span");
	secondSpan.id = 'seconds';
	secondSpan.innerHTML = "00";

	millisecondSpan = document.createElement("span");
	millisecondSpan.id = 'milliseconds';
	millisecondSpan.innerHTML = "0";

	controlDiv = document.createElement("div");
	controlDiv.id = 'controls';

	startButton = document.createElement("button");
	startButton.id = 'start';
	startButton.onclick = start;
	startButton.innerHTML = "Start";
	startButton.className = "startButton";

	lapButton = document.createElement("button");
	lapButton.id = 'lap';
	lapButton.onclick = lap;
	lapButton.innerHTML = "Lap";
	lapButton.className = "regularButton";

	resetButton = document.createElement("button");
	resetButton.id = 'reset';
	resetButton.onclick = reset;
	resetButton.innerHTML = "Reset";
	resetButton.className = "regularButton";

	lapDiv = document.createElement('div');
	lapDiv.id = 'lapDiv';
	lapDiv.innerHTML = "Lap Times";

	lapTable = document.createElement('TABLE');
	lapTable.id = 'lapTable';
	var row = lapTable.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = "Lap";
	cell2.innerHTML = "Lap Time";

	lapResetButton = document.createElement('button');
	lapResetButton.id = 'lapTableReset';
	lapResetButton.onclick = resetTable;
	lapResetButton.innerHTML = "Clear laps";
	lapResetButton.className = "regularButton";

	timerDiv.appendChild(hourSpan);
	timerDiv.appendChild(colonNode.cloneNode());
	timerDiv.appendChild(minuteSpan);
	timerDiv.appendChild(colonNode.cloneNode());
	timerDiv.appendChild(secondSpan);
	timerDiv.appendChild(periodNode);
	timerDiv.appendChild(millisecondSpan);
	controlDiv.appendChild(startButton)
	controlDiv.appendChild(lapButton);
	controlDiv.appendChild(resetButton);
	lapDiv.appendChild(lapTable);
	lapDiv.appendChild(lapResetButton);
	mainDiv.appendChild(timerDiv);
	mainDiv.appendChild(controlDiv);
	mainDiv.appendChild(lapDiv);

}
function changeTimer() {
	hours = parseInt(document.getElementById('hours').innerHTML);
	minutes = parseInt(document.getElementById('minutes').innerHTML);
	seconds = parseInt(document.getElementById('seconds').innerHTML);
	milliseconds = parseInt(document.getElementById('milliseconds').innerHTML);
	if(milliseconds < 9) {
		milliseconds++;
		millisecondSpan = milliseconds;
		document.getElementById('milliseconds').innerHTML = millisecondSpan;
	} else {
		document.getElementById('milliseconds').innerHTML = "0";
		if(seconds < 59) {
			seconds++;
			secondSpan = (seconds < 10) ? "0" + seconds: seconds;
			document.getElementById('seconds').innerHTML = secondSpan;
		} else {
			document.getElementById('seconds').innerHTML = "00";
			if(minutes < 59) {
				minutes++;
				var minuteSpan = (minutes < 10)? "0" + minutes: minutes;
				document.getElementById('minutes').innerHTML = minuteSpan;
			} else {
				document.getElementById('minutes').innerHTML = "00";
				hours++;
				var hourSpan = (hours < 10) ? "0" + hours: hours;
				document.getElementById('hours').innerHTML = hourSpan;
			}
		}
	}

}
function start() {
	if(!timer) {
		startButton.innerHTML = "Stop";
		startButton.onclick = stop;
		startButton.className = "stopButton";
		timer = setInterval(changeTimer,100);
	}
}
function stop() {
	clearInterval(timer);
	timer = false;
	startButton.innerHTML = "Start";
	startButton.onclick = start;
	startButton.className = "startButton";
}
function reset() {
	stop();
	document.getElementById('hours').innerHTML = "00";
	document.getElementById('minutes').innerHTML = "00";
	document.getElementById('seconds').innerHTML = "00";
	document.getElementById('milliseconds').innerHTML = "0";
	var table = document.getElementById('lapTable');
	table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;	
}
function resetTable() {
	var table = document.getElementById('lapTable');
	table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;
}
function lap() {
	hours = parseInt(document.getElementById('hours').innerHTML);
	hours = (hours < 9) ? "0" + hours : hours;
	minutes = parseInt(document.getElementById('minutes').innerHTML);
	minutes = (minutes < 9) ? "0" + minutes : minutes;
	seconds = parseInt(document.getElementById('seconds').innerHTML);
	seconds = (seconds < 9) ? "0" + seconds : seconds;
	milliseconds = parseInt(document.getElementById('milliseconds').innerHTML);
	var table = document.getElementById('lapTable');
	var newRow = table.insertRow(table.rows.length);
	var cell1 = newRow.insertCell(0);
	var cell2 = newRow.insertCell(1);
	cell1.innerHTML = table.rows.length - 1;
	cell2.innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
document.onload = addTimer();