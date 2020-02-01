const argv = require('./config/yargs.js').argv; //Es decir argv.argv 
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion); //Esta función retorna una tarea por hacer
        console.log(tarea);
        break

    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('======Por Hacer======'.green);
            console.log('Descripción', tarea.descripcion);
            console.log('Completado', tarea.completado);
            console.log('====================='.green);
        }
        //console.log('Mostrar todas las tardeas por hacer');
        break

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        if (actualizado === true) {
            console.log('Se actualizó la tarea');
        } else {
            console.log('No se encontró la tarea');
        }
        break

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        if (borrado === true) {
            console.log('Se borró exitosamente la tarea');
        } else {
            console.log('No se encontró la tarea');
        }
        break;

    default:
        console.log('Comando no es reconocido');
}

module.exports = { //Esto es para que lo pueda utilizar en otros archivos
    argv
}