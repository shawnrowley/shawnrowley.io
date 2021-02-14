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
  $(".skill-header").css("color", "grey");
  $(this).animate({
    fontSize: "5rem"
  }, 200);
})

$(".skill-icon").on("mouseout", function() {
  $(this).animate({
    fontSize: "4rem"
  }, 200);
  $(".skill-header").css("color", "black");
});

$(".skill-icon").on("click", function() {
  var id = $(this)[0].dataset.id;
  axios.get('/skills/' + id)
    .then(function(response) {
      var skill = response.data;
      $('#exampleModalLongTitle').text(skill.name);
      $('#description-skill').html(skill.description);
      $('#exampleModalCenter').modal('show');
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function() {
      // always executed
    });
});

$(".skill-box img").on("click", (e) => {
  var id = $(e.target)[0].dataset.id;
  axios.get('/skills/' + id)
    .then(function(response) {
      var skill = response.data;
      $('#exampleModalLongTitle').text(skill.name);
      $('#description-skill').html(skill.description);
      $('#exampleModalCenter').modal('show');
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function() {
      // always executed
    });
});

$(".skill-box img").on("mouseover", function() {
  $(".skill-header").css("color", "grey");
  $(this).animate({
    width: "30%"
  }, 200);
})

$(".skill-box img").on("mouseout", function() {
  $("#dialog").dialog("close");
  $(this).animate({
    width: "25%"
  }, 200);
  $(".skill-header").css("color", "black");
});
