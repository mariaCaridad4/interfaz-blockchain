

import { HttpClient } from "./http.client";


const obtenerMedicosConfianza = async ()=>{
    return  await HttpClient.get('/medico/medico_emergencia/obtener')
}

const obtenerNotificaciones = async (id)=>{
    return  await HttpClient.get(`/paciente/notificaciones/obtenerNotificaciones/${id}`)
}


/**
 * 
 * @param {datos} datos Tiene datos.organizacion se diferencia del otro
 * @returns 
 */
const agregarMedicoConfianza = async (datos)=>{
    return  await HttpClient.post("/medico/medico_emergencia/nuevo", datos)
}

const eliminarMedicoConfianza = async (datos)=>{
    return  await HttpClient.delete("/medico/medico_emergencia/eliminar", datos)
}

const eliminarAcceso= async (datos)=>{
    return  await HttpClient.post("/paciente/notificaciones/eliminarAcceso", datos)
}
const autorizarAcceso= async (datos)=>{
    return  await HttpClient.post("/paciente/notificaciones/autorizarAcceso", datos)
}

export default {
    obtenerMedicosConfianza,
    obtenerNotificaciones,
    agregarMedicoConfianza,
    eliminarMedicoConfianza,
    eliminarAcceso,
    autorizarAcceso
}