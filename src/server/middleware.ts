const verify_token = async ()=>{
    let response = true
    try{
        let user=undefined
        user =sessionStorage.getItem("user")
        if(user){
            user = JSON.parse(user)
            let actualTime = Date.now()
            if(actualTime > user.exp){
                response = false
            }            
        }
    }catch(e){
        console.log('Error al verificar el token')
        console.log(e)
        response=false
    }finally{
        return response
    }
}

export default{
    verify_token
}