if (typeof(Storage) !== "undefined") {
  
  if (localStorage.stamps) {
    var stored_status = JSON.parse(localStorage["status"]);
    var stored_stamp = JSON.parse(localStorage["stamps"]);
    localStorage.new_timestamp = Math.round(new Date().getTime()/1000);
    
  } else {
    var stored_stamp = [0,0,0];
    var stored_status = [0,0,0];
    var stored_last_stamp = [0,0,0];
    localStorage["stamps"] = JSON.stringify(stored_stamp);
    localStorage["status"] = JSON.stringify(stored_status);
    localStorage["last_stamps"] = JSON.stringify(stored_last_stamp);
  }
}

function calculateStampAndStop(){
    stored_last_stamp = JSON.parse(localStorage["last_stamps"]);
    stored_status = JSON.parse(localStorage["status"]);  
    stored_stamp = JSON.parse(localStorage["stamps"]);
    for (let i = 0; i < stored_status.length; i++) {
      if(stored_status[0] == 1 ){
        stored_stamp[0] = parseInt(stored_stamp[0]) + (parseInt(localStorage.new_timestamp) - parseInt(stored_last_stamp[0]))
        stored_status[0] = 0
      }
      if(stored_status[1] == 1 ){
        console.log("masuk sini kah")
        stored_stamp[1] = parseInt(stored_stamp[1]) + (parseInt(localStorage.new_timestamp) - parseInt(stored_last_stamp[1]))
        stored_status[1] = 0
      }
      if(stored_status[2] == 1 ){
        stored_stamp[2] = parseInt(stored_stamp[2]) + (parseInt(localStorage.new_timestamp) - parseInt(stored_last_stamp[2]))
        stored_status[1] = 0
      }
    }
    localStorage["status"] = JSON.stringify(stored_status);
    localStorage["stamps"] = JSON.stringify(stored_stamp);
}

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
    calculateStampAndStop()
    if ( document.URL.includes("task1.html") ) {
      stored_status[0] = 1
      localStorage["status"] = JSON.stringify(stored_status);
    }
    if ( document.URL.includes("task2.html") ) {
      stored_status[1] = 1
      localStorage["status"] = JSON.stringify(stored_status);
    }
    if ( document.URL.includes("task3.html") ) {
      stored_status[2] = 1
      localStorage["status"] = JSON.stringify(stored_status);
    }
    sw.timer = setInterval(sw.tick, 1000);
    sw.ego.innerHTML = "Pause";
    sw.ego.removeEventListener("click", sw.start);
    sw.ego.addEventListener("click", sw.stop);
  },

  // (D) STOP
  stop: function () {
    if ( document.URL.includes("task1.html") ) {
      stored_status[0] = 0 
      stored_stamp[0] = sw.now
      localStorage["stamps"] = JSON.stringify(stored_stamp);
      localStorage["status"] = JSON.stringify(stored_status);
    }
    if ( document.URL.includes("task2.html") ) {
      stored_status[1] = 0
      stored_stamp[1] = sw.now
      localStorage["stamps"] = JSON.stringify(stored_stamp);
      localStorage["status"] = JSON.stringify(stored_status);
    }
    if ( document.URL.includes("task3.html") ) {
      stored_status[2] = 0
      stored_stamp[2] = sw.now
      localStorage["stamps"] = JSON.stringify(stored_stamp);
      localStorage["status"] = JSON.stringify(stored_status);
    }
    clearInterval(sw.timer);
    // sw.timer = null;
    sw.ego.innerHTML = "Continue";
    sw.ego.removeEventListener("click", sw.stop);
    sw.ego.addEventListener("click", sw.start);
  },

  // (E) RESET
  reset: function () {
    if ( document.URL.includes("task1.html") ) {
      stored_status[0] = 0 
      stored_stamp[0] = 0
      localStorage["stamps"] = JSON.stringify(stored_stamp);
      localStorage["status"] = JSON.stringify(stored_status);
    }
    if ( document.URL.includes("task2.html") ) {
      stored_status[1] = 0
      stored_stamp[1] = 0
      localStorage["stamps"] = JSON.stringify(stored_stamp);
      localStorage["status"] = JSON.stringify(stored_status);
    }
    if ( document.URL.includes("task3.html") ) {
      stored_status[2] = 0
      stored_stamp[2] = 0
      localStorage["stamps"] = JSON.stringify(stored_stamp);
      localStorage["status"] = JSON.stringify(stored_status);
    }
    if (sw.timer != null) {
      sw.total.innerHTML = sw.temp;
      sw.stop();

    }
    sw.ego.innerHTML = "Start";
    sw.now = -1;
    sw.tick();
  }
};


window.addEventListener("load", sw.init);
window.onbeforeunload = closingCode;


window.onload = function() {
  if(localStorage.jdl_tugas1){
      judul = document.getElementById("jdl_tugas1");
      judul.innerHTML = localStorage.jdl_tugas1
  }
  if(localStorage.jdl_tugas2){
    judul = document.getElementById("jdl_tugas2");
    judul.innerHTML = localStorage.jdl_tugas1
  }
  if(localStorage.jdl_tugas3){
    judul = document.getElementById("jdl_tugas3");
    judul.innerHTML = localStorage.jdl_tugas1
  }
  
  if (typeof(Storage) !== "undefined") {
  
    if (localStorage.stamps) {
      stored_status = JSON.parse(localStorage["status"]);
      //stored_status = stored_status.replace(/,(?!["{}[\]])/g, "");
      
      stored_stamp = JSON.parse(localStorage["stamps"]);
      
      stored_last_stamp = JSON.parse(localStorage["last_stamps"]);
  
      if ( document.URL.includes("task1.html") ) {
        if(stored_status[0] == 1 ){
          stored_stamp[0] = parseInt(stored_stamp[0]) + (parseInt(localStorage.new_timestamp) - parseInt(stored_last_stamp[0]))
          localStorage["stamps"] = JSON.stringify(stored_stamp);
          sw.start();
        }
        sw.now = stored_stamp[0]
      }
      if ( document.URL.includes("task2.html") ) {
        if(stored_status[1] == 1 ){
          console.log("masuk sini kah")
          stored_stamp[1] = parseInt(stored_stamp[1]) + (parseInt(localStorage.new_timestamp) - parseInt(stored_last_stamp[1]))
          localStorage["stamps"] = JSON.stringify(stored_stamp);
          sw.start();
        }
        sw.now = stored_stamp[1]
      }
      if ( document.URL.includes("task3.html") ) {
        if(stored_status[2] == 1 ){
          stored_stamp[2] = parseInt(stored_stamp[2]) + (parseInt(localStorage.new_timestamp) - parseInt(stored_last_stamp[2]))
          localStorage["stamps"] = JSON.stringify(stored_stamp);
          sw.start();
        }
        sw.now = stored_stamp[2]
      }
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
    } else {
      var stored_stamp = [0,0,0];
      var stored_status = [0,0,0];
      var stored_last_stamp = [0,0,0];
      localStorage["stamps"] = JSON.stringify(stored_stamp);
      localStorage["status"] = JSON.stringify(stored_status);
      localStorage["last_stamps"] = JSON.stringify(stored_last_stamp);
    }
  }
  
}; 



function closingCode(){
  stored_last_stamp = JSON.parse(localStorage["last_stamps"]);
  console.log(stored_last_stamp)
  if ( document.URL.includes("task1.html") ) {
    stored_stamp[0] = sw.now
    localStorage["stamps"] = JSON.stringify(stored_stamp);
    stored_last_stamp[0] = Math.round(new Date().getTime()/1000)
    localStorage["last_stamps"] = JSON.stringify(stored_last_stamp);
  }
  if ( document.URL.includes("task2.html") ) {
    
    stored_stamp[1] = sw.now
    localStorage["stamps"] = JSON.stringify(stored_stamp);
    stored_last_stamp[1] = Math.round(new Date().getTime()/1000)
    
    localStorage["last_stamps"] = JSON.stringify(stored_last_stamp);
    
  }
  if ( document.URL.includes("task3.html") ) {
    stored_stamp[2] = sw.now
    localStorage["stamps"] = JSON.stringify(stored_stamp);
    stored_last_stamp[2] = Math.round(new Date().getTime()/1000)
    localStorage["last_stamps"] = JSON.stringify(stored_last_stamp);
  }

}