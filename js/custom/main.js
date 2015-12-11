function main() {
  $("button").click(buttonClick);
};

function buttonClick() {
  var buttonId = $(this).attr("id");
  var $userEntry = $("#user-entry");
  switch(buttonId) {
    case "clear":
      $userEntry.val("");
      eval("");
      break;
    case "eval":
      eval($userEntry.val());
      break;
    case "sign":
      $userEntry.val(parseInt($userEntry.val())*(-1));    
      break;
    case "bksp":
      $userEntry.val($userEntry.val().substring(0, $userEntry.val().length - 1));
      break;
    default: 
      if (buttonId.substring(0, buttonId.length-2) == "button") {
        $userEntry.val($userEntry.val() + buttonId[buttonId.length - 1]);
      };
  };
};

function eval(res) {
  var $result = $("#result");
  if (typeof(res) !== "undefined") $result.val(res);
  return $result.val();
};


$(document).ready(main);
