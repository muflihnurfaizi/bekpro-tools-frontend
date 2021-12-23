$(function () {
  // hide unhide form input
  $("#tulis-sejarah").on("click", function () {
    $("#form-input").slideToggle("500");
  });
  // animasi label tanggal
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
  // export func-------------------------
  $("#exportClick").on("click", function () {
    $("#exportButton").toggleClass("fade-out fade-in");
    $(this).toggleClass("highlight");
  });
  // tables-------------------------------
  const tableKerjaan = $("#tableKerjaan").DataTable({
    dom: 't<"table_Bottom"ip>',
    buttons: ["csv", "excel", "pdf"],
    pagingType: "simple",
    pageLength: 10,
    language: {
      zeroRecords: "Gak ada datanya boy",
      paginate: {
        next: "-->",
        previous: "<--",
      },
    },
  });
  //--search box
  $("#searchBoxTable").on("keyup", function () {
    tableKerjaan.search(this.value).draw();
  });

  tableKerjaan.buttons().container().appendTo("#exportButton");
});
