
/**
 * Class for interacting with the server
 */
class Api {

    /**
     * Init
     * @param {string} url - the url to send the requests to
     */
    constructor(url){

        /**
         * The url for fetch requests
         * @type {string}
         */
        this._url = url;

        /**
         * The current directory we are looking at
         * @type {string}
         */
        this._currentDir;

    }

    /**
     * Send a network request
     * @param {Object} obj - the object to send to the server
     * @return {Promise<Object>} a promise with the object response
     */
    _post(obj){
        /**
         * The headers for thhe request
         * @type {Headers}
         */
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');

        /**
         * The request options
         * @type {object}
         */
        const options = {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            body: JSON.stringify(obj)
        };

        /**
         * The request class
         * @type {Request}
         */
        const request = new Request(this._url, options);

        return new Promise((resolve, reject)=>{
            fetch(request).then((response)=>{
                return response.json();
            }).then((json)=>{
                if(json.error){
                    reject(json.error);
                } else {
                    //set the cuurent dir
                    this._currentDir = json.dir;
                    resolve(json);
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    /**
     * Execute a cmd on the api
     * @param {object} options - the options object to use
     * @property {string} action - the api action to execute
     * @property {string} dir - the directory to use
     * @property {string} folder - the folder to use in directory moving
     * @property {string} file - the file to use for selecting
     * @return {Promise<Objetc>} a promise with the object response
     */
    exec(options){
        /**
         * The default options
         * @type {object}
         * @property {string} dir - the current directory to use
         */
        let defaults = {};

        if(this._currentDir){
            defaults.dir = this._currentDir;
        }

        Object.assign(defaults, options);
        
        return this._post(defaults);
    }


}

export default Api;
