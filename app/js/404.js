$(function() {
  var t = 4;
  var timer = window.setInterval(function() {
    if (t < 0) {
      window.clearInterval(timer);
      window.location.href = $("#goUrl").attr("href");
      return;
    }
    $("#timer").text(t);
    t -= 1;

  }, 1000);
});