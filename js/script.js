
/*=========================================
DATOS GENERALES
=========================================*/

function colocarTexto(id, texto) {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = texto ?? "";
}

colocarTexto("tipoEvento", evento.tipo);
colocarTexto("nombreEvento", evento.nombre);
colocarTexto("nombresCompletos", evento.nombreNovios);
colocarTexto("fraseNombres", "“" + evento.fraseNombres + "”");
colocarTexto("fraseEvento", evento.frase);
colocarTexto("salonEvento", evento.salon);
colocarTexto("horaRecepcion", "Recepción a partir de las " + evento.horaRecepcion);


/*=========================================
PADRES DE LOS NOVIOS
=========================================*/

colocarTexto("padreNovia", evento.padresNovia?.[0]);
colocarTexto("madreNovia", evento.padresNovia?.[1]);
colocarTexto("padreNovio", evento.padresNovio?.[0]);
colocarTexto("madreNovio", evento.padresNovio?.[1]);


/*=========================================
CONTADOR
=========================================*/

const fechaEvento = new Date(evento.fechaEvento).getTime();

function actualizarContador() {

    const ahora = Date.now();
    const diferencia = Math.max(0, fechaEvento - ahora);

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    colocarTexto("dias", dias);
    colocarTexto("horas", horas);
    colocarTexto("minutos", minutos);
    colocarTexto("segundos", segundos);
}

actualizarContador();
setInterval(actualizarContador, 1000);


/*=========================================
MÚSICA
=========================================*/

const musica = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("musica");

if (musica) {
    musica.src = evento.musica;
}

if (musica && botonMusica) {

    botonMusica.addEventListener("click", function() {

        if (musica.paused) {

            musica.play().then(function() {
                botonMusica.innerHTML = '<i class="fa-solid fa-pause"></i>';
                botonMusica.style.background = "#d4af37";
                botonMusica.style.color = "white";
            }).catch(function(error) {
                console.error("No se pudo reproducir la música:", error);
            });

        } else {

            musica.pause();
            botonMusica.innerHTML = '<i class="fa-solid fa-play"></i>';
            botonMusica.style.background = "white";
            botonMusica.style.color = "#222";

        }

    });

}


/*=========================================
NUESTRA HISTORIA (SOLO TEXTO)
=========================================*/

if (evento.historia?.nacimiento) {

    colocarTexto(
        "tituloNacimiento",
        evento.historia.nacimiento.subtitulo || evento.historia.nacimiento.titulo
    );

    colocarTexto(
        "textoNacimiento",
        evento.historia.nacimiento.texto
    );

}


/*=========================================
CONFIRMACIÓN DE ASISTENCIA
=========================================*/

let adultos = 1;
let ninos = 0;

const txtAdultos = document.getElementById("adultos");
const txtNinos = document.getElementById("ninos");

const masAdultos = document.getElementById("masAdultos");
const menosAdultos = document.getElementById("menosAdultos");
const masNinos = document.getElementById("masNinos");
const menosNinos = document.getElementById("menosNinos");

const confirmarWhatsapp = document.getElementById("confirmarWhatsapp");

if (txtAdultos) txtAdultos.textContent = adultos;
if (txtNinos) txtNinos.textContent = ninos;

if (masAdultos) {
    masAdultos.onclick = function() {
        adultos++;
        colocarTexto("adultos", adultos);
    };
}

if (menosAdultos) {
    menosAdultos.onclick = function() {
        if (adultos > 1) {
            adultos--;
            colocarTexto("adultos", adultos);
        }
    };
}

if (masNinos) {
    masNinos.onclick = function() {
        ninos++;
        colocarTexto("ninos", ninos);
    };
}

if (menosNinos) {
    menosNinos.onclick = function() {
        if (ninos > 0) {
            ninos--;
            colocarTexto("ninos", ninos);
        }
    };
}

if (confirmarWhatsapp) {

    confirmarWhatsapp.onclick = function() {

        const campoNombre = document.getElementById("nombreInvitado");
        const nombre = campoNombre ? campoNombre.value.trim() : "";

        if (nombre === "") {
            alert("Por favor escribe tu nombre.");
            return;
        }

        const telefono = evento.telefono;

        const mensaje = `Hola.

Mi nombre es ${nombre}.

Confirmo mi asistencia a la boda de ${evento.nombreNovios}.

Adultos: ${adultos}

Niños: ${ninos}

Muchas gracias.`;

        window.open(
            `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
            "_blank"
        );

    };

}


/*=========================================
AGENDA
=========================================*/

const timeline = document.getElementById("timeline");

if (timeline && Array.isArray(evento.agenda)) {

    timeline.innerHTML = "";

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

}


/*=========================================
MAPA DE RECEPCIÓN
=========================================*/

const btnMapaRecepcion = document.getElementById("btnMapaRecepcion");

if (btnMapaRecepcion && evento.mapaRecepcion) {

    btnMapaRecepcion.addEventListener("click", function(e) {
        e.preventDefault();
        window.open(evento.mapaRecepcion, "_blank");
    });

}



/*=========================================
PADRINOS Y NOMBRAMIENTOS
=========================================*/

const contenedorPadrinos = document.getElementById("contenedorPadrinos");
const seccionSoloPadrinos = document.getElementById("seccionSoloPadrinos");

const parametros = new URLSearchParams(window.location.search);
const categoriaSeleccionada = parametros.get("padrinos");
const tipoInvitacion = parametros.get("tipo");

if (tipoInvitacion === "invitados") {

    if (seccionSoloPadrinos) {
        seccionSoloPadrinos.style.display = "none";
    }

} else if (contenedorPadrinos && Array.isArray(evento.padrinos)) {

    contenedorPadrinos.innerHTML = "";

    const padrinosMostrar = categoriaSeleccionada
        ? evento.padrinos.filter(p => p.categoria === categoriaSeleccionada)
        : evento.padrinos;

    // Agrupar los padrinos por categoría
    const gruposPadrinos = {};

    padrinosMostrar.forEach(function(padrino) {

        if (!gruposPadrinos[padrino.categoria]) {
            gruposPadrinos[padrino.categoria] = {
                titulo: padrino.titulo,
                nombres: []
            };
        }

        gruposPadrinos[padrino.categoria].nombres.push(padrino.nombres);

    });

    // Crear una tarjeta por cada categoría
    Object.values(gruposPadrinos).forEach(function(grupo) {

        contenedorPadrinos.innerHTML += `
            <div class="padrino-card">

                <p class="texto-nombramiento">
                    Tenemos el honor de nombrarlos
                </p>

                <h3>${grupo.titulo}</h3>

                <p class="nombre-padrino">
                    ${grupo.nombres.join("<br>")}
                </p>

            </div>
        `;

    });

}


/*=========================================
ANIMACIONES AOS
=========================================*/

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

}


/*=========================================
CARRUSEL DE PORTADA
=========================================*/

const slides = document.querySelectorAll(".hero-slide");
let slideActual = 0;

if (slides.length > 1) {

    setInterval(function() {

        slides[slideActual].classList.remove("active");

        slideActual++;

        if (slideActual >= slides.length) {
            slideActual = 0;
        }

        slides[slideActual].classList.add("active");

    }, 5000);

}
