const publicFolder=require('../../public/url')
const argon2=require('argon2')
const{Admin}=require('../database')

const login= async(req,res)=>{
    res.sendFile(publicFolder+'/login.html')
}

const reset = async(req,res)=>{
    res.sendFile(publicFolder+'/resetpassword.html')
}

module.exports={
    login,
    reset
}