
import { expect } from 'chai';

import Api from './api';

const api = new Api('http://localhost:3000');

describe('Api Test Post', function(){

    it('Should be able to init', function(done){
        api.exec({action: 'init'}).then((rst)=>{
            console.dir(rst.dir);
            expect(rst.dir).to.be.a('string');
            done();
        }, (err)=>{
            console.dir(err);
            expect(true).to.be.equal(false);
            done();
        });
    });

    it('Should be able to go up a directory', function(done){
        api.exec({action: 'up'}).then((rst)=>{
            console.dir(rst.dir);
            expect(rst.dir).to.be.a('string');
            done();
        }, (err)=>{
            console.dir(err);
            expect(true).to.be.equal(false);
            done();
        });
    });

    it('Should be able to open a folder', function(done){
        api.exec({action: 'open', folder: 'api'}).then((rst)=>{
            console.dir(rst.dir);
            expect(rst.dir).to.be.a('string');
            done();
        }, (err)=>{
            console.dir(err);
            expect(true).to.be.equal(false);
            done();
        });
    });

    it('Should be able to select a file', function(done){
        api.exec({action: 'select', file: 'api.js'}).then((rst)=>{
            console.dir(rst.file);
            expect(rst.status).to.be.equal('selected');
            done();
        }, (err)=>{
            console.dir(err);
            expect(true).to.be.equal(false);
            done();
        });
    });

});
