import { atom } from "recoil";

const lessonatom=atom({
    key:'lesson',
    default:localStorage.getItem('lesson') || 0
})

export default lessonatom