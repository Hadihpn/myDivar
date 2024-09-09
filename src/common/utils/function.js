const moment = require("jalali-moment")
const isTrue = (value) => ["true", 1, true].includes(value);
const isFalse = (value) => ["false", 0, false].includes(value);
const removePropertyInObject = (target = {}, properties = []) => { 

    for(const item of properties){
        delete target[item];
    }
    return target;
}
function invoiceNumberGenerator(){
    return moment.format("YYYMMDDHHmmssSSS")+String(process.hrtime()[1]).padStart(9,0)
}
module.exports = {
    isTrue,
    isFalse,
    removePropertyInObject,
    invoiceNumberGenerator
}