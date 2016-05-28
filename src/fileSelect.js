
import React from 'react';

import Api from './include/api';

import FileList from './include/fileList';

import { Button, Modal } from 'react-bootstrap';

/**
 * The main component of the app
 */
class FileSelect extends React.Component {
    
    /**
     * Init
     * @param {Object} props - the props passed to the component
     */
    constructor(props){
        super(props);

        /**
         * The component state
         * @type {Object}
         * @property {boolean} show - show the modal or not
         * @property {string} currentDir - the current selected directory
         * @prperty {array} files - the list of files in the current directory
         * @property {string} buttonText - the text of the button element
         */
        this.state = {
            show: false,
            currentDir: '',
            files: [],
            buttonText: 'Open File'
        };

        /**
         * The api class for sending messages to the server
         * @type {Api}
         */
        this._api = new Api('http://localhost:3000');

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.reset = this.reset.bind(this);
        this.updateText = this.updateText.bind(this);
        this.up = this.up.bind(this);
        this.goTo = this.goTo.bind(this);
        this.select = this.select.bind(this);
    }

    /**
     * Open the modal
     */
    open(){
        this.setState({show: true});
        //Init the api
        this._api.exec({action: 'init'}).then((rst)=>{
            this.setState({currentDir: rst.dir, files: rst.files});
        }, (err)=>{
            this.reset(err);
        });
    }

    /**
     * Close the modal
     */
    close(){
        this.setState({show: false});
    }

    /**
     * Reset the modal
     * @param {string} err - the error from the api if any
     */
    reset(err){
        if(err){
            console.log(new Error(err));
        }
        this.close();
        this.open();
    }

    /**
     * Go up a directory
     */
    up(){
        this._api.exec({action: 'up', dir: this.state.currentDir}).then((rst)=>{
            this.setState({currentDir: rst.dir, files: rst.files});
        }, (err)=>{
            this.reset(err);
        });
    }

    /**
     * Open a directory location
     */
    goTo(){
        this._api.exec({action: 'list', dir: this.state.currentDir}).then((rst)=>{
            this.setState({currentDir: rst.dir, files: rst.files});
        }, (err)=>{
            this.reset(err);
        });
    }

    /**
     * Execute a command from the file list
     * @param {Object} cmd - the api command from the child
     */
    select(cmd){
        cmd.dir = this.state.currentDir;
        this._api.exec(cmd).then((rst)=>{
            //if selected close the modal and set the button text to the file name
            if(rst.status === 'selected'){
                this.setState({buttonText: rst.file});
                this.close();
            } else {
                this.setState({currentDir: rst.dir, files: rst.files});
            }
        }, (err)=>{
            this.reset(err);
        });
    }

    /**
     * Update the file location search bar
     * @param {Event} event - the update event
     */
    updateText(event){
        this.setState({currentDir: event.target.value})
    }

    /**
     * The react render function
     * @returns {JSX} the jsx representation of the components dom
     */
    render(){
        return (
            <div>
                <Button
                    bsStyle="primary"
                    onClick={this.open}
                >
                    {this.state.buttonText}
                </Button>
                
                <Modal
                    show={this.state.show}
                    onHide={this.close}
                    bsSize="large"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Select File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-1">
                                <Button
                                    bsStyle="default"
                                    onClick={this.up}
                                >
                                    <span className="glyphicon glyphicon-arrow-up"></span>
                                </Button>
                            </div>
                            <div className="col-md-10">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.currentDir}
                                        onChange={this.updateText}
                                    />
                                </div>
                            </div>
                            <div className="col-md-1">
                                <Button
                                    bsStyle="success"
                                    onClick={this.goTo}
                                >
                                    <span className="glyphicon glyphicon-folder-open"></span>
                                </Button>
                            </div>
                        </div>
                        <FileList files={this.state.files} cb={this.select}/> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

/**
 * The default propTypes
 * @type {Object}
 */
FileSelect.propTypes = {};

/**
 * The default props
 * @type {Object}
 */
FileSelect.defaultProps = {};

export default FileSelect;
