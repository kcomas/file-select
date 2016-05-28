
import React from 'react';

import { Button } from 'react-bootstrap';

/**
 * Class for listing the files in a directory
 */
class FileList extends React.Component {

    /**
     * Init
     * @param {Object} props - the props passed from the parrent
     * @property {array} files - the files array
     * @property {function} cb - the callback to the parrent component
     */
    constructor(props){
        super(props);
    }

    /**
     * The react render function
     * @returns {JSX} the jsx dom
     */
    render(){

        /**
         * Convert the files object to JSX
         * @type {JSX}
         */
        let list = this.props.files.map((obj)=>{
            let dir = "";
            if(obj.isDir){
                dir = (
                    <span className="glyphicon glyphicon-folder-close"></span>
                );
            }
            return (
                <div className="col-md-4 text-left fileButton">
                    <Button 
                        bsStyle="default" 
                        key={obj.name}
                        onClick={
                            () => {
                                if(obj.isDir){
                                    this.props.cb({
                                        action: 'open',
                                        folder: obj.name
                                    });
                                } else {
                                    this.props.cb({
                                        action: 'select',
                                        file: obj.name
                                    });
                                }
                            }
                        }
                    >
                    {obj.name} {dir}
                    </Button>
                </div>
            );
        });

        return (
            <div className="row">
                {list}
            </div>
        );
    }

}

/**
 * The default prop types
 * @type {Object}
 * @property {array} files - the files array
 * @property {function} cb - the callback to the parrent component
 */
FileList.propTypes = {
    files: React.PropTypes.array,
    cb: React.PropTypes.func
};

/**
 * The default props
 * @type {Object}
 */
FileList.defaultProps = {};

export default FileList;
