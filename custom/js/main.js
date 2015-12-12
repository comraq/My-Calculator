$(document).ready(function() {
  $("#title").mouseenter(function() {
    $("#title").fadeTo('slow', 1);
  });

  $("#title").mouseleave(function() {
    $("#title").fadeTo('slow', 0.3);
  }); 

  $("button").click(function() {
    $(".wip-description").show();
  }); 

  $(".wip").mouseleave(function() {
    $(".wip-description").hide();
  });

  $(".wip-description").hide();
});
