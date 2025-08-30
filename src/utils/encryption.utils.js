





import CryptoJS from "crypto-js"

export const encryption=async({value,secertKey}={})=>{
        return CryptoJS.AES.encrypt(JSON.stringify(value),secertKey).toString()
}

export const dencryption=async({cipher,secertKey}={})=>{
        return CryptoJS.AES.decrypt(cipher,secertKey).toString(CryptoJS.enc.Utf8)
}