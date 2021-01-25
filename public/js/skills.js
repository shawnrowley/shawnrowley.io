$("#dialog").dialog({
  autoOpen: false,
  height: "auto",
  width: 300,
  show: {
    effect: "blind",
    duration: 500
  },
  hide: {
    effect: "explode",
    duration: 500
  }
}).css("font-size", "10px");

$(".skill-icon").on("mouseover", function() {
  var isOpen = $("#dialog").dialog("isOpen");
  if (!isOpen) {
    $(".skill-header").css("color", "grey");
    $(this).animate({
      fontSize: "5rem"
    }, 200);
    $("#dialog").dialog({
      position: {
         my: "center top",
         at: "center bottom",
         of: this
      }
    });
    $("#dialog").dialog("open");
  }
})

$(".skill-icon").on("mouseout", function() {
  $("#dialog").dialog("close");
  $(this).animate({
    fontSize: "4rem"
  }, 200);
  $(".skill-header").css("color", "black");
});

$(".skill-icon").on("click", function() {
  // $("#dialog").dialog("open");
});
//
// $(".skill-box .popup").on("mouseover", function() {
//   $(this).animate({display : "30%"}, 200);
//
// })

$(".skill-box img").on("click", function() {
  // $("#dialog").dialog("open");
});

$(".skill-box img").on("mouseover", function() {
  var isOpen = $("#dialog").dialog("isOpen");
  if (!isOpen) {
    $(".skill-header").css("color", "grey");
    //$(".skill-box .popup").css("display", "block");
    $(this).animate({
      width: "30%"
    }, 200);

    $("#dialog").dialog({
      position: {
        my: "center top",
        at: "center bottom",
        of: this
      }
    });
    $("#dialog").dialog("open");
  }
})

$(".skill-box img").on("mouseout", function() {
  $("#dialog").dialog("close");
  $(this).animate({
    width: "25%"
  }, 200);
  $(".skill-header").css("color", "black");
});
