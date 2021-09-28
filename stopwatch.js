if (typeof(Storage) !== "undefined") {
  
  if (localStorage.stamps) {
    var stored_status = JSON.parse(localStorage["status"]);
    //stored_status = stored_status.replace(/,(?!["{}[\]])/g, "");
    
    var stored_stamp = JSON.parse(localStorage["stamps"]);
    

    localStorage.new_timestamp = Math.round(new Date().getTime()/1000);
    
  } else {
    var stored_stamp = [0,0,0];
    var stored_status = [0,0,0];
    localStorage["stamps"] = JSON.stringify(stored_stamp);
    localStorage["status"] = JSON.stringify(stored_status);
    localStorage.setItem("last_timestamp", Math.round(new Date().getTime()/1000));
  }
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
    sw.ego.value = "Pause";
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
    sw.ego.value = "Continue";
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
    sw.ego.value = "Start";
    sw.now = -1;
    sw.tick();
  }
};

function closingCode(){
  localStorage.setItem("last_timestamp", Math.round(new Date().getTime()/1000));
  if ( document.URL.includes("task1.html") ) {
    stored_stamp[0] = sw.now
    localStorage["stamps"] = JSON.stringify(stored_stamp);

  }
  if ( document.URL.includes("task2.html") ) {
    stored_stamp[1] = sw.now
    localStorage["stamps"] = JSON.stringify(stored_stamp);

  }
  if ( document.URL.includes("task3.html") ) {
    stored_stamp[2] = sw.now
    localStorage["stamps"] = JSON.stringify(stored_stamp);
  }
}
window.addEventListener("load", sw.init);
window.onbeforeunload = closingCode;


window.onload = function() {
  if (typeof(Storage) !== "undefined") {
    console.log("masuk ga")
    if (localStorage.stamps) {
      var stored_status = JSON.parse(localStorage["status"]);
      //stored_status = stored_status.replace(/,(?!["{}[\]])/g, "");
      
      var stored_stamp = JSON.parse(localStorage["stamps"]);
  
      localStorage.new_timestamp = Math.round(new Date().getTime()/1000);
      for (let i = 0; i < stored_status.length; i++) {
        if(stored_status[0] == 1 ){
          stored_stamp[0] = parseInt(stored_stamp[0]) + (parseInt(localStorage.new_timestamp) - parseInt(localStorage.last_timestamp))
          localStorage["stamps"] = JSON.stringify(stored_stamp);

          sw.start();

          break;
        }
        if(stored_status[1] == 1 ){
          stored_stamp[1] = parseInt(stored_stamp[1]) + (parseInt(localStorage.new_timestamp) - parseInt(localStorage.last_timestamp))
          localStorage["stamps"] = JSON.stringify(stored_stamp);
          sw.start();
          
          break;
        }
        if(stored_status[2] == 1 ){
  
          stored_stamp[2] = parseInt(stored_stamp[2]) + (parseInt(localStorage.new_timestamp) - parseInt(localStorage.last_timestamp))
          localStorage["stamps"] = JSON.stringify(stored_stamp);
          sw.start();

          break;
        }
      }
  
      if ( document.URL.includes("task1.html") ) {
        sw.now = stored_stamp[0]
      }
      if ( document.URL.includes("task2.html") ) {
        sw.now = stored_stamp[1]
        console.log("im here")
      }
      if ( document.URL.includes("task3.html") ) {
        sw.now = stored_stamp[2]
      }
      
    } else {
      var stored_stamp = [0,0,0];
      var stored_status = [0,0,0];
      localStorage["stamps"] = JSON.stringify(stored_stamp);
      localStorage["status"] = JSON.stringify(stored_status);
      localStorage.setItem("last_timestamp", Math.round(new Date().getTime()/1000));
    }
  }
  
}; 