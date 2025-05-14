import { atom } from "recoil";

const usercourseatom=atom({
    key:'usercourse',
    default:localStorage.getItem('usercourse') || null 
})



export default usercourseatom