const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};
const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra la tarea especificada', {
        descripcion
    })

.help() //muestra la ayuda que definí arriba
    .argv; //Regresa el valor del argv

module.exports = { //Esto es para que lo pueda utilizar en otros archivos
    argv
}

//Antes lo hicimos así pero lo optimizamos
// const argv = require('yargs')
//     .command('crear', 'Crea una tarea por hacer', {
//         descripcion: {
//             demand: true,
//             alias: 'd',
//             desc: 'Descripción de la tarea por hacer'
//         }
//     })
//     .command('actualizar', 'Actualiza el estado completado de una tarea', {
//         descripcion: {
//             demand: true,
//             alias: 'd',
//             desc: 'Descripción de la tarea por hacer'
//         },
//         completado: {
//             alias: 'c',
//             default: true,
//             desc: 'Marca como completado o pendiente la tarea'
//         }
//     })
//     .command('borrar', 'Borra la tarea especificada', {
//         descripcion: {
//             demand: true,
//             alias: 'd',
//             desc: 'Descripción de la tarea por hacer'
//         }
//     })