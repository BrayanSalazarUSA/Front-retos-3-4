/**
 * Invoca peticion WS GET con parametro (id) para recuperar información del registro
 * y pintar información en el formulario de edición
 */
function editarRegistro(llaveRegistro) {
    //crea un objeto javascript
    let datos = {
        id: llaveRegistro,
        /* name:$("#Cname").val(),
        description:$("#Cdescription").val() */
    }
    console.log(datos)

    //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
    let datosPeticion = JSON.stringify(datos);


    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://localhost:8080/api/Category/"+llaveRegistro,

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
        success: function ( respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            /* console.log("Respuesta del get: " +respuesta[0].id) */
            console.log(respuesta);
            $("#mensajes").show(1000);
            $("#mensajes").html("Información recuperada...");
            $("#mensajes").hide(1000);
            activaEditar();
            editarRespuesta(respuesta);
          
            
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
    var llave = llaveRegistro
    console.log("Estos e suna llave " + llave)
    return llaveRegistro;
}

/* 
    Esta función se encarga de recorrer el listado de datos 'items' recibido como parametro,
    construir una tabla html en la variable javascript 'tabla',
    acceder al elemento elemento identificado con el id 'listado'
    y modificar su html agregando el contenido de la variable 'tabla'.
    
*/
function editarRespuesta(items) {
    /* console.log("Items: "+items[0]) */
    $("#idEdit").val(items.id);
    $("#idEdit").hide()
    $("#nameEdit").val(items.name);
    $("#descripcionEdit").val(items.description);
    $("#modelEdit").val(items.model);
    $("#categoryEdit").val(items.category_id);   
    console.log(items.description) 
}

//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo PUT
function actualizar(llave) {
console.log(llave)
    //crea un objeto javascript
    let datos = {
        id: $("#idEdit").val(),
        name: $("#nameEdit").val(),
        description: $("#descripcionEdit").val(),
    }
    console.log("Se ejecuto actualizar")
    console.log(datos.id)
    console.log(datos)
    //convierte el objeto javascript a json antes de agregarlo a los datos de la petición
    let datosPeticion = JSON.stringify(datos);

        $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: "http://localhost:8080/api/Category/update",

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
                console.log("Respuesta del update:");
                console.log(respuesta)
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
    console.log("Se ejecuto la funcion activaEditar")
    $("#idEdit").show();
    $("#editar").show();
    $("#idEdit").focus();
    $("#nuevo").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
    
}