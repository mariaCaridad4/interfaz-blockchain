

import { HttpClient } from "./http.client";


const obtenerPoliticas = async (id)=>{
    return  await HttpClient.get(`/politicas/politica/obtener/${id}`)
}

const obtenerAtributos = async ()=>{
    return  await HttpClient.get(`/politicas/atributo/obtener`)
}

/**
 * 
 * @param {datos} datos Tiene datos.organizacion se diferencia del otro
 * @returns 
 */
const crearPolitica = async (datos)=>{
    return  await HttpClient.post("/politicas/politica/nuevo", datos)
}

const crearAtributo = async (datos)=>{
    return  await HttpClient.post("/politicas/atributo/nuevo", datos)
}

export default {
    crearAtributo,
    crearPolitica,
    obtenerAtributos,
    obtenerPoliticas
    
}