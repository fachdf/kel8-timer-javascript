if (typeof(Storage) !== "undefined") {
  if (localStorage.task1_stamp) {
    if(localStorage.task1_status == "true"){
      localStorage.setItem("new_timestamp", Math.round(new Date().getTime()/1000));
      localStorage.task1_stamp = parseInt(localStorage.task1_stamp) + (parseInt(localStorage.new_timestamp) - parseInt(localStorage.last_timestamp))
    }
  } else {
    localStorage.setItem("task1_stamp", 0);
    localStorage.setItem("task2_stamp", 0);
    localStorage.setItem("task1_status", "false");
    localStorage.setItem("task2_status", "false");
    localStorage.setItem("last_timestamp", Math.round(new Date().getTime()/1000));
  }
}

if(localStorage)
var sw = {
  // (A) INITIALIZE
  etime: null, // HTML time display
  erst: null, // HTML reset button
  ego: null, // HTML start/stop button
  total: null,
  temp: null,
  init: function () {
    // (A1) GET HTML ELEMENTS
    sw.etime = document.getElementById("sw-time");
    sw.erst = document.getElementById("sw-rst");
    sw.ego = document.getElementById("sw-go");
    sw.total = document.getElementById("sw-total");

    // (A2) ENABLE BUTTON CONTROLS
    sw.erst.addEventListener("click", sw.reset);
    sw.erst.disabled = false;
    sw.ego.addEventListener("click", sw.start);
    sw.ego.disabled = false;
  },

  // (B) TIMER ACTION
  timer: null, // timer object
  now: 0, // current elapsed time
  tick: function () {
    // (B1) CALCULATE HOURS, MINS, SECONDS
    sw.now++;
    var remain = sw.now;
    var hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    var mins = Math.floor(remain / 60);
    remain -= mins * 60;
    var secs = remain;

    // (B2) UPDATE THE DISPLAY TIMER
    if (hours < 10) { hours = "0" + hours; }
    if (mins < 10) { mins = "0" + mins; }
    if (secs < 10) { secs = "0" + secs; }
    sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
    sw.temp = hours + " Jam " + mins + " Menit " + secs + " Detik";
  },
  
  // (C) START!
  start: function () {
    localStorage.task1_status = "true"
    sw.timer = setInterval(sw.tick, 1000);
    sw.ego.value = "Pause";
    sw.ego.removeEventListener("click", sw.start);
    sw.ego.addEventListener("click", sw.stop);
  },

  // (D) STOP
  stop: function () {
    localStorage.task1_stamp = sw.now
    localStorage.task1_status = "false"
    clearInterval(sw.timer);
    // sw.timer = null;
    sw.ego.value = "Continue";
    sw.ego.removeEventListener("click", sw.stop);
    sw.ego.addEventListener("click", sw.start);
    
  },

  // (E) RESET
  reset: function () {
    if (sw.timer != null) {
      sw.total.innerHTML = sw.temp;
      sw.stop();

    }
    sw.ego.value = "Start";
    sw.now = -1;
    sw.tick();
  }
};
window.addEventListener("load", sw.init);
window.onbeforeunload = closingCode;
function closingCode(){
  localStorage.setItem("last_timestamp", Math.round(new Date().getTime()/1000));
  localStorage.task1_stamp = sw.now
}
window.onload = function() {
  if(localStorage.task1_status == "true"){
    sw.now = localStorage.task1_stamp;
    sw.start();
  }
};