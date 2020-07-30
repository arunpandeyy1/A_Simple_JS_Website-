let timerobj = {
  minutes: 0,
  seconds: 0,
  timerId: 0
}
function soundAlarm() {
  let amount = 3;
  let audio = new Audio("Timer_Sound_Effect.mp3");
  audio.play();
  function playSound() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
  for (var i = 0; i < amount; i++) {
    setTimeout(playSound ,1200*i);
  }
}
function updateValue(key,value) {
  if (value<0) {
    value = 0;
    console.log("Positive nnumbers only");
  }
  if (key=="seconds") {
    if (value<10) {
      value="0"+value;
    }
    if (value>59) {
      value=59;
    }
  }
  $("#"+key).html(value||0);
  timerobj[key] = value;
}
(function detectChanges(key) {
  let input = "#" +key+ "-input";
  $(input).change(function () {
    updateValue(key,$(input).val());
  });
  $(input).keyup(function () {
    updateValue(key,$(input).val());
  });
  return arguments.callee;
})("minutes")("seconds");
function startTimer() {
  buttonManager(["start",false],["pause",true],["stop",true]);
  freezeInputs();
  timerobj.timerId = setInterval(function() {
    timerobj.seconds--;
    if (timerobj.seconds<0) {
      if (timerobj.minutes==0) {
        soundAlarm();
        return stopTimer();
      }
      timerobj.seconds = 59;
      timerobj.minutes--;
    }
    updateValue("minutes",timerobj.minutes);
    updateValue("seconds",timerobj.seconds);
  },1000)
}
function stopTimer() {
  clearInterval(timerobj.timerId);
  buttonManager(["start",true],["pause",false],["stop",false]);
  unfreezeInputs();
  updateValue("minutes",$("#minutes-input").val());
  let seconds = $("#seconds-input").val() || "0";
    updateValue("seconds", seconds);
}
function pauseTimer() {
  buttonManager(["start",true],["pause",false],["stop",true]);
  clearInterval(timerobj.timerId);
}
function buttonManager(...buttonsArray) {
  for (var i = 0; i < buttonsArray.length; i++) {
    let button = "#" + buttonsArray[i][0] + "-button";
    if (buttonsArray[i][1]) {
      $(button).removeAttr("disabled");
    }
    else {
      $(button).attr("disabled","disabled");
    }
  }
}
function freezeInputs() {
  $("#minutes-input").attr("disabled", "disabled");
  $("#seconds-input").attr("disabled", "disabled");
}
function unfreezeInputs() {
  $("#minutes-input").removeAttr("disabled");
  $("#seconds-input").removeAttr("disabled");
}
