var breakSound = new Audio();
var workSound = new Audio();
breakSound.src =
  "http://soundbible.com/mp3/cartoon-telephone_daniel_simion.mp3";
workSound.src = "http://soundbible.com/mp3/cartoon-telephone_daniel_simion.mp3";

var breakBoolean = false;
var minutesToAdjust = 25;
var breakTime = 5;
const millisecondsPerMinute = 60000;
var counter = 1;
var increment = 0;
function isEven(n) {
  return n % 2 === 0;
}

function main() {
  var x = setInterval(function() {
    if (!breakBoolean) {
      display(minutesToAdjust * millisecondsPerMinute + increment, x);
      increment -= 1000;
      if (!isEven(counter)) {
        clearInterval(x);
      }
    } else {
      display(breakTime * millisecondsPerMinute + increment, x);
      increment -= 1000;
      if (!isEven(counter)) {
        clearInterval(x);
      }
    }
  }, 1000);
}

function display(distance, x) {
  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (minutes === 0 && seconds === 0) {
    if (!breakBoolean) {
      playSound(breakSound);
    }
    if (breakBoolean) {
      playSound(workSound);
    }

    clearInterval(x);
    startBreak();
  }
  // Display the result in the element
  if (seconds < 10 || seconds === 0) {
    $(".time").text(minutes + ":0" + seconds);
  } else {
    $(".time").text(minutes + ":" + seconds);
  }
}

$("#addSession").click(function() {
  if (minutesToAdjust < 60) {
    minutesToAdjust += 5;
    increment = 0;
  }
  $(".time").text(minutesToAdjust + " min");
});

$("#subtractSession").click(function() {
  if (minutesToAdjust > 5) {
    increment = 0;
    minutesToAdjust -= 5;
  }
  $(".time").text(minutesToAdjust + " min");
});

$("#addBreak").click(function() {
  if (breakTime < 20) {
    breakTime++;
  }
  $(".time").text(breakTime + " min" + " Break");
});

$("#subtractBreak").click(function() {
  if (breakTime > 5) {
    breakTime--;
  }
  $(".time").text(breakTime + " min" + " Break");
});

//
$("#timer").click(function() {
  counter++;
  if (isEven(counter)) {
    hideUI();
    main();
  }
  if (!isEven(counter)) {
    showUI();
  }
});

function startBreak() {
  if (!breakBoolean) {
    $("#clock").addClass("freedom");

    breakBoolean = true;
    increment = 0;
    main();
  } else {
    $("#clock").removeClass("freedom");
    breakBoolean = false;
    increment = 0;
    main();
  }
}

function hideUI() {
  $(".session").addClass("hide");
  $(".break").addClass("hide");
}

function showUI() {
  $(".session").removeClass("hide");
  $(".break").removeClass("hide");
}

$("#reset").click(function() {
  reset();
});

function reset() {
  clearInterval(x);
  increment = 0;
  counter = 1;
  breakBoolean = false;
  main();
}

function playSound(obj) {
  obj.load();
  obj.play();
}