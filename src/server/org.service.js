import { HttpClient } from "./http.client";



const obtenerOrganizaciones = async ()=>{
    return  await HttpClient.get("/registro/organizacion/obtener")
}

const obtenerUnaOrg = async (id)=>{
    return  await HttpClient.get(`/registro/organizacion/obtener/${id}`)
}

/**
 * 
 * @param {datos} datos Tiene datos.organizacion se diferencia del otro
 * @returns 
 */
const crearAdmin = async (datos)=>{
    return  await HttpClient.post("/registro/user/nuevo", datos)
}

export default {
    obtenerOrganizaciones,
    crearAdmin,
    obtenerUnaOrg
    
}