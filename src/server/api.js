import axios from "axios";
const api = axios.create({
  // baseURL: "http://localhost:3000/", //Ruta del backend
  baseURL: "http://10.0.2.3:23000/",
  withCredentials: false, 
});



export default api;
