const allowedOrigins = require("./allowOrigin.js");

const CorsOption = {
    origin : (origin , callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null , true)
        }else{
            callback(new Error("CORS 오류 발생"));
        }
    },
    optionsSuccessStatus : 200,
    
}

module.exports = {CorsOption}