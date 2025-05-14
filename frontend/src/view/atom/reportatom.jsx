
import { atom } from "recoil";

const reportatom=atom({
    key:'report',
    default:JSON.parse(localStorage.getItem('report')) || null
})

export default reportatom

