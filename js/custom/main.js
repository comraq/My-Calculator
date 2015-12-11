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
          if (exprStack[exprStack.length - 1] == "-") {
            exprStack.splice(-1, 1, "+", $userEntry.val()*(-1));
          } else {
            exprStack.push($userEntry.val());
          }
          updateResult(eval(exprStack).toString());
        }
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if ($userEntry.val().length == 0) {
          warn(val);
        } else { 
          if (exprStack[exprStack.length - 1] == "-") {
            exprStack.splice(-1, 1, "+", $userEntry.val()*(-1));
          } else {
            exprStack.push($userEntry.val()); //Pushes numbers before the current operator
          }
          if (val == "+" || val == "-") checkPrecedence();
          exprStack.push(val); //Pushes the current operator
          updateResult(exprStack.toString().replace(/,/g, ""));
        }
        break;
      case "s":
        if (parseFloat($userEntry.val()) == "NaN") {
          warn("invert sign");
        } else {
          $userEntry.val(parseFloat($userEntry.val())*(-1));
        }    
        break;
      case "d":
        $userEntry.val($userEntry.val().substring(0, $userEntry.val().length - 1));
        break;
      case "l":
        updateResult($userEntry.val());
        break;
      default: 
        alert("Case not yet implemented");
    }
  }
};

function checkPrecedence() {
  if (exprStack.length < 3) return;

  var op = exprStack[exprStack.length - 2];
  if (op == "*" || op == "/" || op == "%") {
    exprStack.splice(-3, 3, eval(exprStack.slice(-3)));
    checkPrecedence();
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
};

$(document).ready(function() {
  clear();

  $("button").click(buttonClick);
});
