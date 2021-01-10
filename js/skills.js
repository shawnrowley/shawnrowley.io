$(".skill-icon").on("mouseover", function() {
  $(".skill-header").css("color", "grey");
  $(this).animate({fontSize : "5rem"}, 200);

})

$(".skill-icon").on("mouseout", function() {
  $(".skill-header").css("color", "black");
  $(this).animate({fontSize : "4rem"}, 200);
});


$(".skill-box img").on("mouseover", function() {
  $(".skill-header").css("color", "grey");
  $(this).animate({width : "30%"}, 200);

})

$(".skill-box img").on("mouseout", function() {
  $(".skill-header").css("color", "black");
  $(this).animate({width : "25%"}, 200);
});
