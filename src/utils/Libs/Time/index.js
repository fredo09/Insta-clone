/**
* Trabajando con fechas 
*/
import { MONTHS } from './../../contantes'

export const obtenerFecha = (UNIX_TIME) => {
    const date = new Date(UNIX_TIME * 1000);

    return {
        anio: date.getFullYear(),
        mes: MONTHS[date.getMonth()],
        date: date.getDate(),
        hora: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds()
    }
}
