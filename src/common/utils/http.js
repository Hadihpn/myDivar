require("dotenv").config();
const {default: axios} = require("axios");
const getAddressDetails = async (lat, lng) => {
    const result = await axios.get(`${process.env.MAP_IR_URL}?lat=${lat}&lon=${lng}`, {
        headers: {
            "x-api-key": process.env.MAP_API_KEY
        }
    }).then(res => res.data);
    return {
        province: result.province,
        city: result.city,
        district: result.region,
        adderss: result.address,
    }
}
module.exports ={
    getAddressDetails
}