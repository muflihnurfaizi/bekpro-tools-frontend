$(document).ready(function () {
  $("#tulis-sejarah").on("click", function () {
    $("#form-input").slideToggle("500");
  });

  $("#input-tanggal").on("focus", function () {
    $("#label-tanggal").removeClass("opacity-0").addClass("opacity-100");
  });

  $("#input-tanggal").on("focusout", function () {
    var str = $("#input-tanggal").val();
    if (str == null || str == "") {
      $("#label-tanggal")
        .removeClass("opacity-100 -top-6")
        .addClass("opacity-0 top-1");
    } else {
      $("#label-tanggal").removeClass("top-1").addClass("-top-6");
    }
  });
});
