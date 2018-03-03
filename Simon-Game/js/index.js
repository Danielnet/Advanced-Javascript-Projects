/*
Simon Memory game
https://www.freecodecamp.org/ Code challenge
Made by Daniel Eidså
*/

$(document).ready(function() {
  var gameTable = [];
  var buttonsPressed = [];
  var round = 1;
  var strictMode = false;
  var wincondition = 20;
  var locked = true;

  $("#count").text("- -");

  var green = new Audio();
  var red = new Audio();
  var blue = new Audio();
  var yellow = new Audio();
  green.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
  red.src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
  blue.src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
  yellow.src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";

  // ---------------------------------------------------

  $("#button-green").mousedown(function() {
    if (locked === false) {
      buttonPush(green, "#button-green");
      buttonsPressed.push("green");

      isRoundOver(true);
    }
  });

  $("#button-red").mousedown(function() {
    if (locked === false) {
      buttonPush(red, "#button-red");
      buttonsPressed.push("red");

      isRoundOver();
    }
  });

  $("#button-blue").mousedown(function() {
    if (locked === false) {
      buttonPush(blue, "#button-blue");
      buttonsPressed.push("blue");

      isRoundOver();
    }
  });

  $("#button-yellow").mousedown(function() {
    if (locked === false) {
      buttonPush(yellow, "#button-yellow");
      buttonsPressed.push("yellow");

      isRoundOver();
    }
  });

  $("#start").click(function() {
    locked = false;
    $("#count").text(round);
    fillTable();
    run();
  });
  $("#strict").click(function() {
    strict();
  });
  $("#onOff").click(function() {
    //  window.location.href = window.location.href;
    reset();
  });

  // -------------------------------------

  function buttonPush(color, id) {
    playSound(color);
    playLight(id, 200);
  }

  // -----------------------------------

  function strict() {
    if (strictMode === false) {
      $("#strict").addClass("pushed2");
      strictMode = true;
    } else {
      $("#strict").removeClass("pushed2");
      strictMode = false;
    }

    console.log("strict mode is now : " + strictMode);
    console.log(buttonsPressed);
    console.log(gameTable);
    console.log("this is round : " + round);
  }

  //latest edit----------------------------------
  function run() {
    buttonsPressed = [];

    if (buttonsPressed.length <= round) {
      buttonsPressed = [];
    }
    for (var i = 0; i < round; i++) {
      doSetTimeout(i);
    }

    function doSetTimeout(i) {
      var id = getID(gameTable[i]);
      var name = getColor(gameTable[i]);

      setTimeout(function() {
        buttonPush(name, id);
      }, i * 500);
    }
    locked = false;
  }

  function isRoundOver(x) {
    if (round == wincondition) {
      alert("Well played!! YOU WIN");
      reset();
    }
    //check if user input is correct by comparing table indexes.
    //if wrong, then fail and start round again without round++
    var logic = buttonsPressed.length;

    if (buttonsPressed[logic - 1] != gameTable[logic - 1]) {
      locked = true;
      fail();
      console.log("failed!");
    }
    if (buttonsPressed[logic - 1] == gameTable[logic - 1]) {
      //if input correct
      if (buttonsPressed.length == round) {
        //if correct &&

        round++;
        console.log("Correct!");
        $("#count").text(round);

        setTimeout(function() {
          run();
        }, 1500);
      }
      //if input is correct but round is not over, do nothing
    }
  }

  function reset() {
    locked = true;
    gameTable = [];
    buttonsPressed = [];
    round = 1;
    strictMode = false;
    $("#strict").removeClass("pushed2");
    $("#count").text("- -");
  }

  function fail() {
    console.log("fail");

    if (strictMode === true) {
      locked = true;
      $("#count").text("! ! !");
      setTimeout(function() {
        reset();
      }, 1500);
    } else {
      setTimeout(function() {
        run();
      }, 1500);
    }
  }

  // -----------------------------------------------

  function playSound(color) {
    color.load();
    if (color.paused) {
      color.play();
    } else {
      color.currentTime = 0;
    }
  }

  function playLight(button, timer) {
    $(button).addClass("pushed");
    setTimeout(function() {
      $(button).removeClass("pushed");
    }, timer);
  }

  function functionSet(x) {
    switch (x) {
      case 1:
        return gameTable.push("green");

      case 2:
        return gameTable.push("red");

      case 3:
        return gameTable.push("blue");

      case 4:
        return gameTable.push("yellow");
    }
  }

  function fillTable() {
    for (var i = 0; i < 20; i++) {
      var rand = Math.floor(Math.random() * 4 + 1);
      functionSet(rand);
    }
  }

  function getID(id) {
    switch (id) {
      case "green":
        return "#button-green";

      case "red":
        return "#button-red";

      case "blue":
        return "#button-blue";

      case "yellow":
        return "#button-yellow";
    }
  }

  function getColor(color) {
    switch (color) {
      case "green":
        return green;

      case "red":
        return red;

      case "blue":
        return blue;

      case "yellow":
        return yellow;
    }
  }
});