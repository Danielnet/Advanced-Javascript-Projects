$(document).ready(function() {
  var userSign;
  var compSign;
  var gameWon = false;
  var computerFirst;
  var move = 0;

  var gameMap = {
    a0: "",
    b0: "",
    c0: "",
    a1: "",
    b1: "",
    c1: "",
    a2: "",
    b2: "",
    c2: ""
  };

  $("li").text("");

  $("#X").click(function() {
    $(".game-body").removeClass("hide");
        $("h1").css("font-size","0px");
    if(move===0){
    userSign = "X";
    compSign = "O";
       }
  });

  $("#O").click(function() {
        $(".game-body").removeClass("hide");
        $("h1").css("font-size","0px");
      if(move===0){
    userSign = "O";
    compSign = "X";
    computerFirst = true;
    compMove(compSign);
      }
  });

  $("li").click(function() {
    if (userSign === "X" || userSign === "O") {
      if (gameMap[this.id].length === 0) {
        playerMove(this.id, userSign);
        calcWinCondition(userSign);
        if (gameWon === false) {
          compMove(compSign);
          calcWinCondition(compSign);
        }
      }
    }
  });

  function playerMove(pos, user) {
    move++;
    $("#" + pos).text(user);
    gameMap[pos] = user;
  }

  function compMove(user) {
    move++;
    if (gameWon === false) {
      var position;
      do {
        position = randomPos();
        var counter = 0;
        if (counter == 100) {
          return "";
        }
      } while (gameMap[position] === "X" || gameMap[position] === "O");

      $("#" + position).text(user);
      gameMap[position] = user;
    }
  }

  function randomPos() {
    var possible = "abc";
    var text = "";
    var numb = getRandomInt(3);
    text = possible.charAt(Math.floor(Math.random() * possible.length));
    text += numb;
    return text;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //reset game
  function reset() {
    gameWon = false;
    computerFirst = false;
    move = 0;
    $("li").text("");
    gameMap = {
      a0: "",
      b0: "",
      c0: "",
      a1: "",
      b1: "",
      c1: "",
      a2: "",
      b2: "",
      c2: ""
    };
  }

  function victory(z) {
    gameWon = true;
    if (arguments.length !== 0) {
      setTimeout(function() {
        reset();
        alert(z + " wins");
      }, 100);
    } else {
      setTimeout(function() {
        reset();
        alert("Draw");
      }, 100);
    }
  }

  function calcWinCondition(z) {
    // all horizontal directions
    if (
      (gameMap.a0 === z && gameMap.b0 === z && gameMap.c0 === z) ||
      (gameMap.a1 === z && gameMap.b1 === z && gameMap.c1 === z) ||
      (gameMap.a2 === z && gameMap.b2 === z && gameMap.c2 === z)
    ) {
     return victory(z);
      
    }
    //all vertical directions
    if (
      (gameMap.a0 === z && gameMap.a1 === z && gameMap.a2 === z) ||
      (gameMap.b0 === z && gameMap.b1 === z && gameMap.b2 === z) ||
      (gameMap.c0 === z && gameMap.c1 === z && gameMap.c2 === z)
    ) {
     return victory(z);
    }
    //all cross directions
    if (
      (gameMap.a0 === z && gameMap.b1 === z && gameMap.c2 === z) ||
      (gameMap.a2 === z && gameMap.b1 === z && gameMap.c0 === z)
    ) {
     return victory(z);
    }
    if (move === 9){
      gameWon = true;
    return victory();
    }
  }

  $("#reset").click(function() {
    reset();
  });

});