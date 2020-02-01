const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = []; // Lo inicializamos como un arreglo vacío

const guardarDB = () => {
    // data es igual al objeto listadoPorHacer pero lo tengo que pasar a formato json
    //JSON.stringify() convierte un objeto a un json totalmente válido
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try { //En caso de que haya un error con el archivo (ej. esté vacío) me devuelve un error
        //Como estamos en un lenguaje que se encuentra del lado del servidor
        // podemos hacer un require directamente de ese archivo y esa función 
        // al detectar que es una archivo json, lo serailiza y lo convierte en eun objeto de JS
        listadoPorHacer = require('../db/data.json'); //Leer un archivo json
    } catch (error) {
        listadoPorHacer = [];

    }
}

const crear = (descripcion) => {
    cargarDB(); //Antes de crear debo argar la DB
    let porHacer = {
            descripcion, //Se debía escribir así: descripcion: descripcion, pero es redundante 
            completado: false //Voy a poner que sea false por defecto porque no tiene razón de ser crear tareas que ya están hechas
        }
        // Hagamos un push del objeto porHacer dentro del listadoPorHacer
    listadoPorHacer.push(porHacer); //Agregar valores a un array
    guardarDB();
    return porHacer;
    // cargarDB();
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    // findIndex() es una funciónde JS que recibe un callback y hace un ciclo interno por cada uno de los eltos
    //y yo puedo obtener cada uno de ellos con la palabla clave le voy a poner tarea 
    let index = listadoPorHacer.findIndex(tarea => { //Función de flecha para considerar cuando encontrar el índice que me interesa
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    //filter() es una función que me permite quitar o filtrar un elmeento y regresa un nuevo arreglo
    let nuevoListado = listadoPorHacer.filter(tarea => { //Regresa las tareas que no coinciden con la condición
        return tarea.descripcion !== descripcion
    });
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = { //Esto es para que lo pueda utilizar en otros archivos
    crear,
    getListado,
    actualizar,
    borrar
}