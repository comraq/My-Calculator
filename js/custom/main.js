var exprStack = [];
function buttonClick() {
  var buttonId = $(this).attr("id");
  var type = buttonId.substring(0, 2);
  var val = buttonId.slice(-1);
  var $userEntry = $("#user-entry");

  if (type == "nb") {
    if ($userEntry.val() == "" && val == ".") $userEntry.val("0");
    $userEntry.val($userEntry.val() + val);
  } else {
    switch(val) {
      case "c":
        clear();
        break;
      case "=":
        if ($userEntry.val().length == 0) {
          warn(val);
        } else {
          stackCurrentNum($userEntry.val());
          updateResult(eval(exprStack).toString());
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        if ($userEntry.val().length == 0) {
          warn(val);
        } else { 
          stackCurrentNum($userEntry.val());
          if (val == "+" || val == "-") checkPrecedence();
          exprStack.push(val); //Pushes the current operator
          updateResult(exprStack.toString().replace(/,/g, ""));
        }
        break;
      case "^":
        if ($userEntry.val().length == 0) {
          warn("pow");
        } else {
          var exp = prompt("Enter nth power for base " + $userEntry.val() + ":", "2");
          if (isNaN(exp)) {
            warn("pow");
          } else {
            $userEntry.val(Math.pow($userEntry.val(), exp));
          }; 
        }; 
        break;
      case "r":
        if ($userEntry.val().length == 0) {
          warn("val");
        } else {
          var root = prompt("Enter nth root for number " + $userEntry.val() + ":", "2");
          if (parseInt(root) == "NaN" || parseInt(root) != root || root < 2) {
            warn("root");
          } else {
            $userEntry.val(Math.pow($userEntry.val(), 1/root));
          };
        };
        break;
      case "s":
        if ($userEntry.val().length != 0) {
          $userEntry.val(parseFloat($userEntry.val())*(-1));
        } else {
          warn("invert sign");
        }    
        break;
      case "n":
        $userEntry.val($userEntry.val().substring(0, $userEntry.val().length - 1));
        break;
      case "l":
        if ($userEntry.val().length == 0) {
          warn("lg");
        } else {
          $userEntry.val(Math.log($userEntry.val(), 2));
        }
        break;
      case "p":
        if ($userEntry.val().length == 0) {
          warn("2^x");
        } else {
          $userEntry.val(Math.pow(2,$userEntry.val()));
        };
        break;
      case "b":
        toBase(2, this); 
        break;    
      case "d":
        toBase(10, this);
        break;
      case "h":
        toBase(16, this);
        break;
      default: 
        alert("Case not yet implemented");
    }
  }
};

function toBase(base, baseButton) {
  var currBase, currVal;
  var updated = false;
  var prefix = "";
  if ($("#op-b").hasClass("active")) {
    currBase = 2;
  } else if ($("#op-d").hasClass("active")) {
    currBase = 10;
  } else {
    currBase = 16;
  }
  var userVal =  $("#user-entry").val();  
  var res = $("#result").val();
  if (res.length == 0 && userVal.length > 0) {
    if (isNaN(userVal)) {
      warn("to Base" + base);
    } else {
      currVal = parseInt(userVal);
      if (base == 2) {
        if (currVal >= 0) prefix = "0";
        currVal = currVal >>> 0;
      }
      updateResult(prefix + currVal.toString(base));
      updated = true;
    };
  } else if (res.length > 0) {
    if (currBase != base) {
      if (currBase == 2 && res[0] == 1) {
        res = parseInt(res, 2);
        res = res - 0xFFFFFFFF - 1;
        updateResult(res.toString(base));
      } else {
        currVal = parseInt(res, currBase);
        if (base == 2) {
          if (currVal >= 0) prefix = "0";
          currVal = currVal >>> 0;
        }
        updateResult(prefix + currVal.toString(base));
      };
      updated = true;
    } else {
      alert("Result is already in Base" + base + "!");
    };
  } else {
    warn("to Base" + base);
  };
  if (updated) {
    $("button").removeClass("active");
    $(baseButton).addClass("active");
  }
}

function stackCurrentNum(num) {
  if (exprStack[exprStack.length - 1] == "-") {
    exprStack.splice(-1, 1, "+", num*(-1));
  } else {
    exprStack.push(num); //Pushes numbers before the current operator
  }
};

function checkPrecedence() {
  if (exprStack.length < 3) return;

  if (exprStack[exprStack.length - 1][0] != "(") {
    var op = exprStack[exprStack.length - 2];
    if (op == "*" || op == "/" || op == "%") {
      exprStack.splice(-3, 3, eval(exprStack.slice(-3)));
      checkPrecedence();
    };
  };
}

function eval(expression) {
  if (expression.length % 2 == 0) {
    warn("evaluate");
  } else {
    var num, op;
    while (expression.length > 1) {
      num = expression.pop();
      op = expression.pop();
      //alert("eval: " + expression + " num: " + num + " op: " + op);
      switch(op) {
        case "+":
          expression[expression.length - 1] =  parseFloat(expression[expression.length - 1]) + parseFloat(num);
          break;
        case "*":
          expression[expression.length - 1] = parseFloat(expression[expression.length - 1]) * parseFloat(num);
          break;
        case "/":
          expression[expression.length - 1] = parseFloat(expression[expression.length - 1]) / parseFloat(num);
          break;
        case "%":
          expression[expression.length - 1] = parseFloat(expression[expression.length - 1]) % parseFloat(num);
          break;
        default:
          warn("undefined");
      };
    };
    //alert("expression returning from eval: " + expression);
    return expression.pop();
  };
};

Math.log = (function() {
  var log = Math.log;
  return function(n, base) {
    return log(n)/((base)? log(base) : 1);
  };
})();

function updateResult(res) {
  if (typeof(res) == "undefined") {
    alert("Invalid Expression!");
  } else {
    $("#result").val(res.replace(/[^0-9]-/g,"-"));
  }
  $("#user-entry").val("");
};

function warn(op) {
  alert("Invalid expr for operation: " + op);
}

function clear() {
  exprStack = [];
  updateResult("");
  $("button").removeClass("active");
  $("#op-d").addClass("active");
};

$(document).ready(function() {
  clear();

  $("body").fadeTo(500, 1, function() {
    $(".calc-container").fadeTo(500, 1);
  });
  $("button").click(buttonClick);
});
