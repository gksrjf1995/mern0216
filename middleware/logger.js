const { format } = require("date-fns");
const {v4 : uuid} = require('uuid');
const fs = require('fs');
const fsPromise = require("fs").promises;
const path = require("path");

const logEvent = async(message , logFilename) => {
    const dataTime = `${format(new Date(), 'yyyy-MM-dd')}`
    const logItem = `${dataTime}\t${uuid()}\t${message}\n`
    try{
            if(!fs.existsSync(path.join(__dirname,"..",'logs'))){
                await fsPromise.mkdir(path.join(__dirname,"..",'logs'))
            }
            await fsPromise.appendFile(path.join(__dirname,"..",'logs' , logFilename),logItem)

    }catch(err){
        console.log(err);
    }
}


const logger = ( req ,res ,next )=>{
    logEvent(`${req.method}\t${req.url}\t${req.header.origin}`,'reqLog.log');
    console.log(`method ${req.method} , path :  ${req.path}`);
    next();
}

module.exports =  {logEvent,  logger }