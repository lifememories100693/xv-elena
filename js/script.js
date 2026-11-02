document.getElementById("tipoEvento").textContent = evento.tipo;

document.getElementById("nombreEvento").textContent = evento.nombre;

document.getElementById("fotoDespedida").src = evento.fotoDespedida;

document.getElementById("fraseEvento").textContent = evento.frase;

document.getElementById("salonEvento").textContent = evento.salon;

document.getElementById("horaRecepcion").textContent =
    "Recepción a partir de las " + evento.horaRecepcion;


/*=========================================
CONTADOR
=========================================*/

const fechaEvento = new Date(evento.fechaEvento).getTime();

function actualizarContador() {

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const segundos = Math.floor(
        (diferencia % (1000 * 60)) /
        1000
    );

    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;

}

setInterval(actualizarContador, 1000);

actualizarContador();


/*=========================================
MÚSICA
=========================================*/

const musica = document.getElementById("musicaFondo");

musica.src = evento.musica;

const botonMusica = document.getElementById("musica");

botonMusica.addEventListener("click", function() {

    if (musica.paused) {

        musica.play();

        botonMusica.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

        botonMusica.style.background = "#d4af37";
        botonMusica.style.color = "white";

    } else {

        musica.pause();

        botonMusica.innerHTML =
            '<i class="fa-solid fa-play"></i>';

        botonMusica.style.background = "white";
        botonMusica.style.color = "#222";

    }

});


/*=========================================
UBICACIÓN
=========================================*/

const botonUbicacion = document.getElementById("ubicacion");

botonUbicacion.addEventListener("click", function() {

    window.open(
        evento.mapaRecepcion,
        "_blank"
    );

});


/*=========================================
LIGHTBOX
=========================================*/

const lightbox = document.getElementById("lightbox");

const imagenGrande = document.getElementById("imagenGrande");

const cerrar = document.getElementById("cerrar");

cerrar.addEventListener("click", function() {

    lightbox.style.display = "none";

});


/*=========================================
CONFIRMACIÓN DE ASISTENCIA
=========================================*/

let adultos = 1;

let ninos = 0;

const txtAdultos = document.getElementById("adultos");

const txtNinos = document.getElementById("ninos");


document.getElementById("masAdultos").onclick = function() {

    adultos++;

    txtAdultos.innerHTML = adultos;

};


document.getElementById("menosAdultos").onclick = function() {

    if (adultos > 1) {

        adultos--;

        txtAdultos.innerHTML = adultos;

    }

};


document.getElementById("masNinos").onclick = function() {

    ninos++;

    txtNinos.innerHTML = ninos;

};


document.getElementById("menosNinos").onclick = function() {

    if (ninos > 0) {

        ninos--;

        txtNinos.innerHTML = ninos;

    }

};


document.getElementById("confirmarWhatsapp").onclick = function() {

    const nombre =
        document.getElementById("nombreInvitado").value;

    if (nombre.trim() === "") {

        alert("Por favor escribe tu nombre.");

        return;

    }

    const telefono = "5219612135882";

    const mensaje =

`Hola.

Mi nombre es ${nombre}.

Confirmo mi asistencia a los XV años de ${evento.nombre}.

Adultos: ${adultos}

Niños: ${ninos}

Muchas gracias.`;

    window.open(

        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,

        "_blank"

    );

};


/*=========================================
BOTÓN WHATSAPP → CONFIRMACIÓN
=========================================*/

const botonWhatsapp =
    document.getElementById("whatsapp");

const seccionConfirmacion =
    document.getElementById("confirmacion");

botonWhatsapp.addEventListener("click", function() {

    seccionConfirmacion.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});


/*=========================================
AGENDA
=========================================*/

const timeline =
    document.getElementById("timeline");

evento.agenda.forEach(function(item) {

    timeline.innerHTML += `

        <div class="evento">

            <div class="hora">
                ${item.hora}
            </div>

            <div class="contenido">

                <h3>${item.titulo}</h3>

                <p>${item.descripcion}</p>

            </div>

        </div>

    `;

});


/*=========================================
MAPA RECEPCIÓN
=========================================*/

document.getElementById("btnMapaRecepcion").onclick =
    function(e) {

        e.preventDefault();

        window.open(evento.mapaRecepcion, "_blank");

    };


/*=========================================
GALERÍA DINÁMICA
=========================================*/

const gridGaleria =
    document.getElementById("gridGaleria");

for (const foto of evento.galeria) {

    const imagen =
        document.createElement("img");

    imagen.src = foto;

    imagen.alt = "Galería";

    imagen.addEventListener("click", function() {

        lightbox.style.display = "flex";

        imagenGrande.src = this.src;

    });

    gridGaleria.appendChild(imagen);

}

/*=========================================
HISTORIA — GALERÍA CON FOTO PRINCIPAL
Y MINIATURAS EN CARRUSEL
=========================================*/

function crearGaleriaHistoria(fotos, contenedorId) {

    const contenedor =
        document.getElementById(contenedorId);

    if (!contenedor || !fotos || fotos.length === 0) {
        return;
    }

    contenedor.innerHTML = "";


    /*=====================================
      FOTO PRINCIPAL
    =====================================*/

    const imagenPrincipal =
        document.createElement("img");

    imagenPrincipal.src = fotos[0];

    imagenPrincipal.alt =
        "Fotografía de la historia";

    imagenPrincipal.classList.add(
        "historia-foto-principal"
    );


    /*=====================================
      LIGHTBOX
    =====================================*/

    imagenPrincipal.addEventListener(
        "click",
        function () {

            lightbox.style.display = "flex";

            imagenGrande.src = this.src;

        }
    );


    contenedor.appendChild(imagenPrincipal);


    /*=====================================
      CONTENEDOR DE MINIATURAS
    =====================================*/

    const miniaturas =
        document.createElement("div");

    miniaturas.classList.add(
        "historia-miniaturas"
    );


    /*=====================================
      CREAR MINIATURAS
    =====================================*/

    fotos.forEach(function (foto, indice) {

        const miniatura =
            document.createElement("img");

        miniatura.src = foto;

        miniatura.alt =
            "Recuerdo " + (indice + 1);

        miniatura.classList.add(
            "historia-miniatura"
        );


        /* Primera foto activa */

        if (indice === 0) {

            miniatura.classList.add(
                "activa"
            );

        }


        /*=================================
          CAMBIAR FOTO PRINCIPAL
        =================================*/

        miniatura.addEventListener(
            "click",
            function () {

                imagenPrincipal.src =
                    this.src;


                /* Quitar estado activo */

                miniaturas
                    .querySelectorAll(
                        ".historia-miniatura"
                    )
                    .forEach(function (item) {

                        item.classList.remove(
                            "activa"
                        );

                    });


                /* Marcar seleccionada */

                this.classList.add(
                    "activa"
                );

            }
        );


        miniaturas.appendChild(
            miniatura
        );

    });


    contenedor.appendChild(
        miniaturas
    );

}
/*=========================================
CREAR GALERÍA DE NACIMIENTO
=========================================*/

crearGaleriaHistoria(
    evento.historia.nacimiento.fotos,
    "galeriaNacimiento"
);


/*=========================================
CREAR GALERÍA DE INFANCIA
=========================================*/

crearGaleriaHistoria(
    evento.historia.infancia.fotos,
    "galeriaInfancia"
);


/*=========================================
TEXTOS DE HISTORIA
=========================================*/

if (evento.historia.nacimiento) {

    document.getElementById(
        "tituloNacimiento"
    ).textContent =
        evento.historia.nacimiento.titulo;

    document.getElementById(
        "textoNacimiento"
    ).textContent =
        evento.historia.nacimiento.texto;

}


if (evento.historia.infancia) {

    document.getElementById(
        "tituloInfancia"
    ).textContent =
        evento.historia.infancia.titulo;

    document.getElementById(
        "textoInfancia"
    ).textContent =
        evento.historia.infancia.texto;

}


/*=========================================
PADRINOS Y NOMBRAMIENTOS
=========================================*/

const listaPadrinos =
    document.getElementById("listaPadrinos");

if (listaPadrinos && evento.padrinos) {

    evento.padrinos.forEach(function(padrino) {

        listaPadrinos.innerHTML += `

            <div class="padrino-card">

                <p class="texto-nombramiento">
                    Tenemos el honor de nombrarlos
                </p>

                <h3>
                    ${padrino.titulo}
                </h3>

                <p class="nombre-padrino">
                    ${padrino.nombres}
                </p>

            </div>

        `;

    });

}


/*=========================================
ANIMACIONES AOS
=========================================*/

AOS.init({

    duration: 1000,

    once: true,

    offset: 100

});


/*=========================================
CARRUSEL DE PORTADA
=========================================*/

const slides =
    document.querySelectorAll(".hero-slide");

let slideActual = 0;


function cambiarSlide() {

    slides[slideActual]
        .classList.remove("active");

    slideActual++;


    if (slideActual >= slides.length) {

        slideActual = 0;

    }


    slides[slideActual]
        .classList.add("active");

}


if (slides.length > 1) {

    setInterval(
        cambiarSlide,
        5000
    );

}