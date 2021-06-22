import { HttpClient } from "./http.client";



const obtenerOrganizacion = async (username,password)=>{
    return  await HttpClient.post("/registro/login",{
        cedula: username,
        password
    })
}


