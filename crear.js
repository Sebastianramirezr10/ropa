$(document).ready(function () {
  class Producto {
    constructor() {
      this.producto = {
        categoria: $("input[name='categoria']").val(),
        detalle: $("input[name='detalle']").val(),
        producto: $("input[name='producto']").val(),
      };
    }
    //guarda los datos
    getProducto() {
      $("#boton").click(function (e) {
        e.preventDefault();
        let producto = new Producto();
        let data = producto.producto;
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/posts",
          data: data,
          success: function (r) {
            console.log(r);
          },
        });
        location.reload();
      });
    }

    //lista los datos
    setProducto() {
      let producto = new Producto();
      let url = "http://localhost:3000/posts/";
      let funcion = producto.mostrarDatos;
      let buscar = producto.modificar;

      $.ajax({
        type: "GET",
        url: url,
        datatype: "json",
        success: function (r) {
          buscar(r);
          funcion(r);
        },
      });
    }

    mostrarDatos(r) {
      let mod = new Producto();
      let funcion = mod.modificar;
      for (let i in r) {
        $(".contenedor").append(
          "<tr><th>" +
            r[i].id +
            "</th>" +
            "<td>" +
            r[i].categoria +
            "</td>" +
            "<td>" +
            r[i].detalle +
            "</td>" +
            "<td>" +
            r[i].producto +
            "</td>" +
            "<td><button value='" +
            r[i].id +
            "' onclick=" +
            funcion(r[i].id) +
            " class='editar'>Edit</button><td>" +
            "</tr>"
        );
      }
    }
    CatePro() {
      let bool = true;
      $("#mostrar").on("click", function (e) {
        e.preventDefault();
        if (bool == true) {
          console.log("validar");
          $("#detalle")
            .add("label[for='detalle']")
            .add("input[name='detalle']")
            .show("#detalle");
          return (bool = false);
        }
        if (bool == false) {
          console.log("click");
          $("#producto")
            .add("label[for='producto']")
            .add("input[name='producto']")
            .add("input[type='submit']")
            .show("#producto");

          return (bool = true);
        }
      });
    }

    modificar(id) {
      $("#editar").attr("click");
    }

    Newrefresh() {
      $("#refresh").on("click", function () {});
    }
  }
  let produ = new Producto();
  produ.getProducto();
  produ.setProducto();
  produ.mostrarDatos();
  produ.modificar();
  produ.CatePro();
  produ.Newrefresh();
});
