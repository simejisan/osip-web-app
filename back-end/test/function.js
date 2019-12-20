process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
var expect = require('chai').expect;
var superTest = require('supertest');
let Functions = require("../models/functions");

let token;
let new_user = {
    "email": "admin@osip.com",
    "password": "123123",
};

let moderatorFunc = {
    "short": "Test Short",
    "name": "Test Name",
    "description": "Test Desciption",
    "level": 0,
    "parent_id": "1415548202492367874",
    "status": 0,
    "on_menu": 0,
    "sort": 1,
    "icon": "abc123",
    "link": "123abc"
};

let id_func = "1428913771618767896";

var authenticatedUser = superTest.agent(server);

chai.use(chaiHttp);

before(function (done) {

    let functionInfo = Functions.getFunctionByName(moderatorFunc.name)
    functionInfo.then(async (info) => {
        if (info.length > 0) {
            await Functions.deleteFunctionByName(moderatorFunc.name)
        }
    })
    authenticatedUser
        .post('/users/login')
        .send(new_user)
        .end(function (err, response) {
            token = response.body.access_token;
            response.should.have.status(200);
            done();
        });
});

after(function (done) {

    let functionInfo = Functions.getFunctionByName(moderatorFunc.name)
    functionInfo.then(async (info) => {
        if (info.length > 0) {
            await Functions.deleteFunctionByName(moderatorFunc.name)
        }
    })
    done();
});

describe('Functions Router', () => {

    describe('Get all functions', () => {
        it('it should GET all the functions', (done) => {
            chai.request(server)
                .get('/functions')
                .set('Authorization', 'OSIP ' + token)
                .end((err, res) => {
                    expect(res.body).to.have.deep.property('functions');
                    res.should.have.status(200);
                    done();
                }
                )
        });
    });


    describe('Create a new function', () => {
        it('it should create a new function when user is logged in', (done) => {
            chai.request(server)
                .post('/functions/create')
                .set('Authorization', 'OSIP ' + token)
                .send(moderatorFunc)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Tạo chức năng thành công');
                    res.should.have.status(200);
                    done();
                }
                )
        });

        it('it should not create a new function when user did not login', (done) => {
            chai.request(server)
                .post('/functions/create')
                .send(moderatorFunc)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Bạn không được phép truy cập');
                    done();
                }
                )
        });
    });

    describe('Update function', () => {
        it('it should Update function when user is logged in', (done) => {
            let functionOfUser = Functions.getFunctionByName(moderatorFunc.name)
            functionOfUser.then((data) => {
                chai.request(server)
                    .put('/functions/update/' + data[0].id)
                    .set('Authorization', 'OSIP ' + token)
                    .send(moderatorFunc)
                    .end((err, res) => {
                        res.body.should.have.property('message').eql('Cập nhật thông tin chức năng thành công');
                        res.should.have.status(200);
                        done();
                    }
                    )
            })

        });

        it('it should not Update function from ID when user did not login', (done) => {
            chai.request(server)
                .put('/functions/update/' + id_func)
                .send(moderatorFunc)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Bạn không được phép truy cập');
                    done();
                }
                )
        });
    });

    describe('Get function from ID', () => {
        it('it should GET function from ID when user is logged in', (done) => {
            let functionOfUser = Functions.getFunctionByName(moderatorFunc.name)
            functionOfUser.then((data) => {
                chai.request(server)
                    .get('/functions/' + data[0].id)
                    .set('Authorization', 'OSIP ' + token)
                    .end((err, res) => {
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('id', data[0].id);
                        res.should.have.status(200);
                        done();
                    }
                    )
            })
        });
        it('it should not GET function from ID when user did not login', (done) => {
            chai.request(server)
                .get('/functions/' + id_func)
                .send(moderatorFunc)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Bạn không được phép truy cập');
                    done();
                }
                )
        });
    });

});
