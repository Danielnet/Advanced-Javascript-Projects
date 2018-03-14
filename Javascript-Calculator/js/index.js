// Javascript calculator.
// Made by Daniel Eidså

// Calculates user input, as a formula.
// White field display's the result.


var userInput = [];
var result = 0;
var operatorActive = true;
var resultArray = [];
var cloneInputArray = [];
var pointActive = true;
var numberLocked = false;

//resets all variables
function cClear() {
  $(".screen-input").text("");
  $(".screen2-input").text("");
  result = 0;
  userInput = [];
  resultArray = [];
  cloneInputArray = [];
  operatorActive = true;
  pointActive = true;
  numberLocked = false;
}

//main function.
//executes when equal button is pressed.
function cCalculate() {
    function findOperator(e) {
    return e === "+" || e === "-" || e === "*" || e === "/";
  }
  try {
  //clone userInput array
  cloneInputArray = userInput.slice(0);
  while (cloneInputArray.length !== 0) {
    //get index of first operator
    var indexOfNextOperator = cloneInputArray.findIndex(findOperator);

    //push first cluster of numbers to result Array
    resultArray.push(
      parseFloat(cloneInputArray.slice(0, indexOfNextOperator).join(""))
    );

    //push first operator to result Array
    resultArray.push(
      cloneInputArray
        .slice(indexOfNextOperator, indexOfNextOperator + 1)
        .join("")
    );

    //delete first cluster of numbers and first operator from cloned array.
    cloneInputArray.splice(0, indexOfNextOperator + 1);

    //if user input does not contain more operations, then push last number cluster to result array
    if (cloneInputArray.findIndex(findOperator) === -1) {
      resultArray.push(
        parseFloat(cloneInputArray.slice(0, cloneInputArray.length).join(""))
      );
      cloneInputArray = [];
    }
  }

  //code block to handle chaining operations
  checkForNaN();
  resultArray = [eval(resultArray.toString().replace(/,/g, ""))];
  updateDisplay();
  resultArray = [];
    numberLocked = true;
  }
  //catch error messages 
  catch(err) {
    alert(err.message);
    cClear();
}
}

function checkForNaN() {
  if (resultArray.includes(NaN)) {
    //reset if NaN
    cClear();
  }
}

//function to update input and answer field.
function updateDisplay() {
  $(".screen-input").text(userInput.join(""));
  $(".screen2-input").text(resultArray);
}

function plus() {
  if (!operatorActive) {
    operatorActive = true;
    return "+";
  } else {
    console.log("restriced : " + operatorActive);
  }
}

function minus() {
  if (!operatorActive) {
    operatorActive = true;
    return "-";
  } else {
    console.log("restriced : " + operatorActive);
  }
}

function multiply() {
  if (!operatorActive) {
    operatorActive = true;
    return "*";
  } else {
    console.log("restriced : " + operatorActive);
  }
}

function divide() {
  if (!operatorActive) {
    operatorActive = true;
    return "/";
  } else {
    console.log("restriced : " + operatorActive);
  }
}

function point() {
  if (!pointActive) {
    console.log("am i run?");
    pointActive = true;
    return ".";
  } else {
    console.log("restriced : " + pointActive);
  }
}

function ce() {
  userInput.pop();
  updateDisplay();
}



$(".button-panel button").click(function() {
  operatorActive = false;
  pointActive = false;
  if(numberLocked===false){
  switch (this.id) {
    case "c1":
      userInput.push(1);
      updateDisplay();
      break;
    case "c2":
      userInput.push(2);
      updateDisplay();
      break;
    case "c3":
      userInput.push(3);
      updateDisplay();
      break;
    case "c4":
      userInput.push(4);
      updateDisplay();
      break;
    case "c5":
      userInput.push(5);
      updateDisplay();
      break;
    case "c6":
      userInput.push(6);
      updateDisplay();
      break;
    case "c7":
      userInput.push(7);
      updateDisplay();
      break;
    case "c8":
      userInput.push(8);
      updateDisplay();
      break;
    case "c9":
      userInput.push(9);
      updateDisplay();
      break;
    case "c0":
      userInput.push(0);
      updateDisplay();
      break;
  }
  }
});

$("#cClear").click(function() {
  numberLocked=false;
  cClear();
});

$("#cEqual").click(function() {
  numberLocked=false;
  cCalculate();
});

$("#cPlus").click(function() {
  numberLocked=false;
  userInput.push(plus());
  updateDisplay();
});
$("#cMinus").click(function() {
  numberLocked=false;
  userInput.push(minus());
  updateDisplay();
});
$("#cMultiply").click(function() {
  numberLocked=false;
  userInput.push(multiply());
  updateDisplay();
});
$("#cDivide").click(function() {
  numberLocked=false;
  userInput.push(divide());
  updateDisplay();
});
$("#cPoint").click(function() {
  numberLocked=false;
  userInput.push(point());
  pointActive = true;
  updateDisplay();
});
$("#ce").click(function() {
  numberLocked=false;
  ce();
});