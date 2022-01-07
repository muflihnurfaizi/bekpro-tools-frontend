$(async function () {
  const uri = "https://api.muflihnurfaizi/api/v1";

  //render data
  async function getData() {
    try {
      const {
        data: { works },
      } = await axios.get(`${uri}/works/`);
      if (works.length < 1) {
        //console.log("eweh data");
        return;
      }
      const allWorks = works
        .map((work) => {
          const { _id: workID, tanggal, lokasi, pekerjaan, personil } = work;
          //console.log(work);
          return `<tr id="${workID}" class="tr">
        <td class="td">${tanggal}</td>
        <td class="td">${lokasi}</td>
        <td class="td">${pekerjaan}</td>
        <td class="td">${personil}</td>
        <td class="td"> <a class="delete"> Hapus </a> </td>
      </tr>`;
        })
        .join("");
      $("#table-body").append(allWorks);
    } catch (error) {
      console.log(error);
    }
  }
  await getData();

  // tables-------------------------------
  const tableKerjaan = $("#tableKerjaan").DataTable({
    dom: 't<"table_Bottom"ip>',
    buttons: ["csv", "excel", "pdf"],
    pagingType: "simple",
    pageLength: 8,
    language: {
      zeroRecords: "Gak ada datanya boy",
      paginate: {
        next: "-->",
        previous: "<--",
      },
    },
  });

  // Delete func
  $("#tableKerjaan").on("click", "a", async function () {
    let id = tableKerjaan.row($(this).parent("td").parent("tr")).id();
    await axios.delete(`${uri}/works/${id}`);
    tableKerjaan.row($(this).parent("td").parent("tr")).remove().draw();
    //console.log(id);
    //alert("Clicked row id " + id);
  });

  // hide unhide form input
  $("#tulis-sejarah").on("click", function () {
    $("#form-input").slideToggle("500");
  });

  // animasi label tanggal
  $("#input-tanggal")
    .on("focus", function () {
      $("#label-tanggal").removeClass("opacity-0").addClass("opacity-100");
    })
    .on("focusout", function () {
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
  tableKerjaan.buttons().container().appendTo("#exportButton");
  $("#exportClick").on("click", function () {
    $("#exportButton").toggleClass("fade-out fade-in");
    $(this).toggleClass("highlight");
  });

  //--search box
  $("#searchBoxTable").on("keyup", function () {
    tableKerjaan.search(this.value).draw();
  });

  //Submit Data to database
  $("#form-submit").on("submit", async function (event) {
    event.preventDefault();
    let tanggal = $("#input-tanggal").val();
    let lokasi = $("#input-lokasi").val();
    let pekerjaan = $("#input-pekerjaan").val();
    let personil = sortName($("#input-personil").val());
    try {
      await axios.post(`${uri}/works/`, {
        tanggal,
        lokasi,
        pekerjaan,
        personil,
      });
      alert("data berhasil ditambahkan, terimakasih!");
    } catch (error) {
      alert("data gagal ditambahkan, coba lagi!");
      console.log(error);
    }
    window.location.reload(true);
  });

  //sort name
  function sortName(value) {
    return value
      .padStart(value.length + 1)
      .split(",")
      .sort()
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  }
});
