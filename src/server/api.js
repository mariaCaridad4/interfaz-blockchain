import https from "https";
import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// https.globalAgent.options.rejectUnauthorized = false;
const api = axios.create({
  // baseURL: "http://localhost:3000/", //Ruta del backend
  baseURL: "https://telemedicina.ucuenca.edu.ec/api/",
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  }),
});




export default api;
