import axios from "axios";
const api = axios.create({
  // baseURL: "http://localhost:3000/", //Ruta del backend
  baseURL: "http://localhost:8080/",
  withCredentials: false, 
});



export default api;
