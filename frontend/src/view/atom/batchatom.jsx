import { atom } from "recoil";


const batchatom=atom({
    key:'batch',
    default:localStorage.getItem('batch') || null
})




export default batchatom