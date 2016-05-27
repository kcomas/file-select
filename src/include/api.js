
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

}

export default Api;
