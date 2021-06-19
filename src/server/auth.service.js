import api from './api'

const login = (username,password)=>{
    return api.post("/registro/login",{
        cedula: username,
        password
    })
}

const logout = ()=>{
    sessionStorage.removeItem('user')
    console.log('logout')
}




export default {
    logout,
    login
}