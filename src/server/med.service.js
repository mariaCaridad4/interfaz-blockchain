

import { HttpClient } from "./http.client";


const obtenerNotificaciones = async (id)=>{
    return  await HttpClient.get(`/medico/obtenerNotificaciones/${id}`)
}

const obtenerMedico = async ()=>{
    return  await HttpClient.get('/medico/obtener')
}

/**
 * 
 * @param {datos} datos Tiene datos.organizacion se diferencia del otro
 * @returns 
 */
const solicitarAcceso = async (datos)=>{
    return  await HttpClient.post("/medico/solicitarAcceso", datos)
}


const consumirAcceso= async (datos)=>{
    return  await HttpClient.post("/medico/consumirAcceso", datos)
}


export default {
    solicitarAcceso,
    obtenerNotificaciones,
    consumirAcceso,
    obtenerMedico
}