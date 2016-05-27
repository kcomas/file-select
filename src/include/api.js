
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
                    resolve(json);
                }
            }).catch((err)=>{
                reject(err);
            });
        });
    }

}

export default Api;
