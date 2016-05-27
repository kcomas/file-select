

"use strict"

/**
 * Simple Nodejs filesytem api
 */
const http = require('http');
const path = require('path');
const fs = require('fs');

/**
 * Send a json server response
 * @param {Response} res - the http response
 * @param {number} code - the http status code
 * @param {Object} body - the response body
 */
const send = (res, code, body) =>{
    res.statusCode = code;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
};

/**
 * Send a 404 request
 * @param {Response} res - the http resonse
 */
const fail = (res) =>{
    res.statusCode = 404;
    res.end(JSON.stringify({error: '404'}));
};

/**
 * List a directory
 * @param {string} dir - the directory to list must be absolute
 * @param {Request} req - the server request
 * @param {Response} res - the http response
 */
const list = (dir, req, res) =>{

    /**
     * The resulting json file object array
     * @type {array}
     */
    let rst = [];

    /**
     * The array of files to check if directory
     * @type {array}
     */
    let filesArray;

    /**
     * Convert the files array to a files object
     */
    const convertToFileObject = () =>{
        if(filesArray.length === 0){
            //send the response
            return send(res, 200, { dir: dir, files: rst });
        }
        /**
         * The file name that will be displayed in the resulting json
         * @type {string}
         */
        let filename = filesArray.shift();
        /**
         * The absolute path of the file
         * @type {string}
         */
        let filepath = path.resolve(dir, filename);
        //check if the file is a directory
        fs.lstat(filepath, (err, stats)=>{
            if(err){
                //ignore the file
                return convertToFileObject();
            }
            /**
             * The object of the file description
             * @type {object}
             * @property {string} name - the file name
             * @property {string} isDir - if the file is a directory
             */
            let fileObject = {};
            fileObject.name = filename;
            if(stats.isDirectory()){
                fileObject.isDir = true;
            } else {
                fileObject.isDir = false;
            }
            //add to the completed array
            rst.push(fileObject);
            convertToFileObject();
        });
    };

    /**
     * Get the files within a directory and send
     */
    const getFiles = () =>{
        fs.readdir(dir, (err, files)=>{
            if(err){
                return fail(res);
            }
            filesArray = files;
            convertToFileObject();
        });
    };

    //check if the directory exists
    fs.lstat(dir, (err, stats)=>{
        if(err){
            return fail(res);
        }
        if(!stats.isDirectory()){
            //return error
            return send(res, 404, { error: "The requested path is not a dir" });
        }
        getFiles();
    });
};


//listen for requests on 3000
http.createServer((req, res)=>{

    //enable cors
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.method === 'OPTIONS'){
        res.statusCode = 200;
        res.end();
    }

    if(req.method !== 'POST'){
        return fail(res);
    }

    /**
     * The body of the post request
     * @type {string}
     */
    let body = "";

    req.on('data', (data)=>{
        body += data;
    });

    req.on('end', ()=>{
        //convert body to json object
        body = JSON.parse(body);
        switch(body.action){
            //open the file system
            case 'init':
                list(__dirname, req, res);
                break;
            //list the current directory
            case 'list':
                list(body.dir, req, res);
                break;
            //go up a folder
            case 'up':
                body.dir = path.resolve(body.dir, '..');
                list(body.dir, req, res);
                break;
            //open a child folder
            case 'open':
                body.dir = path.resolve(body.dir, body.folder);
                list(body.dir, req, res);
                break;
            //select a file for the server
            case 'select':
                /**
                 * The abs file location
                 * @type {string}
                 */
                let loc = path.resolve(body.dir, body.file);
                //check if it exists
                fs.lstat(loc, (err, stats)=>{
                    if(err){
                        return fail(res);
                    }
                    send(res, 200, { status: "selected", file: body.file });
                    console.log(loc);
                });
                break;
            default:
                fail(res);
                break;
        }
    });


}).listen(3000);

console.log('Server Started On 3000');
