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
        if (parseFloat($userEntry.val()) == "NaN") {
          warn("invert sign");
        } else {
          $userEntry.val(parseFloat($userEntry.val())*(-1));
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
        var res = $("#result").val();
        if (res == "") {
          if (isNaN($userEntry.val())) {
            warn("to Binary");
          } else {
            updateResult((parseFloat($userEntry.val()) >>> 0).toString(2));
          }
        } else if (!isNaN(parseFloat(res, 10))) {
          updateResult((parseFloat(res) >>> 0).toString(2));
        } else if (!isNaN(parseFloat(res, 16))) {
          updateResult((parseFloat(res) >>> 0).toString(2));
        } else {
          warn("to Binary");
        }; 
        break;    
      case "d":
        var res = $("#result").val();
        if (res == "") {
          if (isNaN($userEntry.val())) {
            warn("to Decimal");
          } else {
            updateResult(parseInt($userEntry.val()).toString());
          }
        } else if (!isNaN(parseInt(res, 2))) {
          updateResult(parseInt(res, 2).toString(10));
        } else if (!isNaN(parseInt(res, 16))) {
          updateResult(parseInt(res, 16).toString(10));
        } else {
          warn("to Decimal");
        };
        break;
      case "h":
        var res = $("#result").val();
        if (res == "") {
          if (isNaN($userEntry.val())) {
            warn("to Hexaecimal");
          } else {
            updateResult(parseInt($userEntry.val()).toString(16).toUpperCase());
          }
        } else if (!isNaN(parseInt(res, 2))) {
          updateResult(parseInt(res, 2).toString(16).toUpperCase());
        } else if (!isNaN(parseInt(re))) {
          updateResult(parseInt(res).toString(16).toUpperCase());
        } else {
          warn("to Decimal");
        };
        break;
      default: 
        alert("Case not yet implemented");
    }
  }
};

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
  bracket = 0;
  updateResult("");
};

$(document).ready(function() {
  clear();

  $("button").click(buttonClick);
});
