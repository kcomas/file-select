
import { expect } from 'chai';

import Api from './api';

const api = new Api('http://localhost:3000');

describe('Api Test Post', function(){
    it('Should Post To The Api', function(done){
        api._post({action: 'init'}).then((rst)=>{
            console.dir(rst);
            expect(true).to.be.equal(true);
            done();
        }, (err)=>{
            console.dir(err);
            expect(true).to.be.equal(false);
            done();
        });
    });
});
