/*
    Escribe un programa que genere de forma aleatoria uno de estos 4 emojis "Estrella, Árbol de Navidad, Papa Noel, Regalo".
    Luego rellena una matriz de 4x4 al azar con estos emojis

    El programa debe permitir al usuario elegir un emoji que quiere y el número de veces que cree que aparece en la matriz.

    El programa debe contar cuántas veces aparece ese emoji y decirle al usuario si acertó o no.

    Extra: Agregar una interfaz Gráfica interactiva para visualizar de mejor manera los emojis
*/



const emojiAleatorio = (emojisArray) => {

    const rangoMax = emojisArray.length - 1;
    const rangoMin = 0;

    const numAleatorio = Math.floor(Math.random()*(rangoMax - rangoMin + 1) + rangoMin);

    const emojiAleatorio = emojisArray[numAleatorio];

    return emojiAleatorio;
}

const generarMatriz = () => {
    
    let matriz = [];

    for(let i=0; i<4; i++) {
        matriz[i] = [];
        for(let j=0; j<4; j++) {
            matriz[i][j] = emojiAleatorio(emojisArray);
        }
    }

    return matriz;
}

const contadorEmoji = (nombreEmoji, matriz) => {

    let cont = 0;

    matriz.forEach(array => {
        let cantidad = array.filter(elemento => elemento === nombreEmoji).length;
        cont = cont + cantidad;
    });

    return cont;
}

const emojisArray = ['Estrella', 'Árbol', 'Papa Noel', 'Regalo'];

const emojiSeleccionado = prompt(`Elige un Emoji (1, 2, 3 o 4):\n
1. Estrella
2. Árbol
3. Papa Noel
4. Regalo\n`);

const nombreEmojiSeleccionado = emojisArray[parseInt(emojiSeleccionado)-1];

const cantidadApariciones = prompt(`Ingresa la cantidad de veces que crees que aparecerá '${nombreEmojiSeleccionado}' en la Matriz: `);

const matrizEmojis = generarMatriz();
const cantidadEmoji = contadorEmoji(nombreEmojiSeleccionado, matrizEmojis);

const resultado = cantidadEmoji === cantidadApariciones ? 'Felicidades, acertaste!': `Usted ha fallado, la cantidad de apariciones era ${cantidadEmoji}`;

alert(resultado);

console.log(matrizEmojis);
console.log(`Emoji Seleccionado: ${nombreEmojiSeleccionado}`);
console.log(`Cantidad de Apariciones pensada: ${cantidadApariciones}`);
console.log(`En realidad apareció el emoji: ${cantidadEmoji}`);
console.log(resultado);

//NO PODRÉ EJECUTAR ESTE CÓDIGO ACÁ, PORQUE NODE.JS NO RECONOCE AL PROMPT