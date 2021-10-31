/**
 * Invoca peticion WS GET con parametro (id) para recuperar información del registro
 * y pintar información en el formulario de edición
 */
function editarRegistro(llaveRegistro) {
    //crea un objeto javascript
    let datos = {
        id: llaveRegistro
    }
console.log("Se ejecuto editar...")
    //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
    let datosPeticion = JSON.stringify(datos);

    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://localhost:8080/api/Cabin/all" ,

        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
        //data: datosPeticion,

        // especifica el tipo de petición http: POST, GET, PUT, DELETE
        type: 'GET',

        contentType: "application/JSON",

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            $("#mensajes").show(1000);
            $("#mensajes").html("Información recuperada...");
            $("#mensajes").hide(1000);
            editarRespuesta(respuesta);
            activaEditar();
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion PUT..." + status);
            //$("#mensajes").hide(1000);
        }
    });
}

/* 
    Esta función se encarga de recorrer el listado de datos 'items' recibido como parametro,
    construir una tabla html en la variable javascript 'tabla',
    acceder al elemento elemento identificado con el id 'listado'
    y modificar su html agregando el contenido de la variable 'tabla'.
    
*/
function editarRespuesta(items) {
    $("#idEdit").val(items[0].id);
    $("#nameEdit").val(items[0].name);
    $("#roomEdit").val(items[0].rooms);
    $("#brandEdit").val(items[0].brand);
    $("#categoryEdit").val(items[0].id);  
    $("#descriptionEdit").val(items[0].description);
    console.log(items[0].description)    
}

//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo PUT
function actualizar() {
console.log("Descripcion: "+$("#descriptionEdit").val())
    //crea un objeto javascript
    let datos = {
        id: parseInt($("#idEdit").val(), 10),
        
        brand: $("#brandEdit").val(),
        name: $("#nameEdit").val(),
        description:$("#descriptionEdit").val(),
        rooms: parseInt($("#roomEdit").val(), 10),
        /* category_id: $("#categoryEdit").val(), */
        
    }
    console.log("Datos que se envian: " + datos.description)
console.log(typeof datos.id)
console.log(typeof datos.rooms)
    console.log(typeof datos.description)

    //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
    let datosPeticion = JSON.stringify(datos);
    console.log("datos json "+datosPeticion)

        $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: "http://localhost:8080/api/Cabin/update",

            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            //si el metodo del servicio recibe datos, es necesario definir el parametro adicional
            data: datosPeticion,

            // especifica el tipo de petición http: POST, GET, PUT, DELETE
            type: 'PUT',

            contentType: "application/JSON",

            // el tipo de información que se espera de respuesta
            //dataType: 'json',

            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (respuesta) {
                //escribe en la consola del desarrollador para efectos de depuración
                console.log("Esta es la respuesta del PUT "+respuesta);
                $("#mensajes").show(1000);
                $("#mensajes").html("Registro actualizado...");
                $("#mensajes").hide(1000);
                listar();
                estadoInicial();
            },

            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                $("#mensajes").show(1000);
                $("#mensajes").html("Error peticion Post..." + status);
                //$("#mensajes").hide(1000);
            }
        });
    }


/**
 * Configura el aspecto de la página para actualizar el registro
 */
function activaEditar() {
    $("#idEdit").hide();
    $("#editar").show(500);
    $("#idEdit").focus();
    $("#nuevo").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
}