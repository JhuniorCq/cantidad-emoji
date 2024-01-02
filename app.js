const emojis = document.querySelectorAll('.emoji');
const formulario = document.querySelector('form');
const emojisMatriz = document.querySelectorAll('.emoji-matriz');
let emojiSeleccionado = false;
let valoresArray = []; //Este Array contendrá al EMOJI seleccionado y la Cantidad de APARICIONES esocogida

const resaltarEmoji = (evento) => {
    const emojiClickeado = evento.target;
    valoresArray[0] = emojiClickeado;
    
    //Con esto hago que cada que se de click a un Emoji, TODOS los emojis NO tengna borde, para después solo darle borde al emoji clickeado
    emojis.forEach(emoji => emoji.style.border = 'none');

    emojiClickeado.style.border = '3px solid yellow';
    emojiClickeado.style.borderRadius = '6px';
    emojiSeleccionado = true;
}

//Esta función me VALIDARÁ mi INPUT del FORMULARIO
const validarDatos = (evento) => {
    evento.preventDefault(); //Hace que ya NO se envíen los datos al Servidor, pero igual se seguirá activando al presionar el botón
    const inputCantidad = document.getElementById('input-cantidad');
    const valorInputCantidad = parseFloat(inputCantidad.value); // Convierte el Dato a un NUMBER (entero o flotante)
    const parrafoMensaje = document.getElementById('parrafo-mensaje');

    if(!emojiSeleccionado) {
        parrafoMensaje.innerText = 'Debes seleccionar un emoji antes de generar la matriz 😶'
        aparecerMensaje();
        return;
    }

    if(!Number.isInteger(valorInputCantidad) || valorInputCantidad < 0 || valorInputCantidad > 16) {
        parrafoMensaje.innerText = 'Ingresa un número entero entre el 0 al 16 🧐';
        aparecerMensaje();
    } else {
        valoresArray[1] = valorInputCantidad;
        generarMatriz();
        const contenedorMatriz = document.querySelector('.contenedor-matriz');
        contenedorMatriz.style.display = 'block';

        verificarCantidad();
    }
}

const aparecerMensaje = () => {
    const mensajeError = document.getElementById('mensaje-error');
    mensajeError.style.display = 'block';

    setTimeout(() => {
        mensajeError.style.display = 'none';
    }, 2000);
}

const generarMatriz = () => {
    emojiAleatorio();
    emojisMatriz.forEach(emoji => emoji.setAttribute('src', emojiAleatorio())); // A cada <img> del Emoji le asigna un "src" aleatorio
}   

const emojiAleatorio = () => {
    const rangoMaximo = emojis.length - 1;
    const indice = Math.floor(Math.random()*(rangoMaximo + 1));
    const sourceEmoji = emojis[indice].getAttribute('src');

    return sourceEmoji;
}

const verificarCantidad = () => {
    const mensajeVerificacion = document.getElementById('mensaje-verificacion');
    const parrafoVerificacion = document.getElementById('parrafo-verificacion');
    const [emoji, cantidadAparicion] = valoresArray; //Creo que cantidadAparicion no será usad en esta función
    const emojisMatrizArray = [...emojisMatriz];

    const cantidadAparicionReal = emojisMatrizArray.filter(emojiMatriz => {
        const sourceEmojiAleatorio = emojiMatriz.getAttribute('src');
        const sourceEmojiClickeado = emoji.getAttribute('src');

        return sourceEmojiClickeado === sourceEmojiAleatorio;
    }).length;

    parrafoVerificacion.innerText = cantidadAparicionReal === cantidadAparicion ? 
                                    'Felicidades, acertaste la cantidad de apariciones ! 😎': 
                                    'Fallaste, Pepepepepe 😢'

    mensajeVerificacion.style.display = 'block';
    setTimeout(() => {
        mensajeVerificacion.style.display = 'none';
    }, 2500);
}

emojis.forEach(emoji => emoji.addEventListener('click', resaltarEmoji));
formulario.addEventListener('submit', validarDatos);
