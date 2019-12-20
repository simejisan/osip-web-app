process.env.NODE_ENV = 'test';
var user_controller = require("../controllers/usersController");

const Users = require("../models/users");
const Roles = require("../models/roles");
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
var expect = require('chai').expect;
var request = require('supertest')(server);

let old_user = {
    "name": "Tran Van A",
    "email": "tva@gmail.com",
    "password": "12345678",
    "repassword": "12345678",
    "avatar_url": "https://lh3.googleusercontent.com/-fWLtCjE-brE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcI4HMQaIG0nfAIg5a_Pwo5_awuUw.CMID/s64-c/photo.jpg"
};

let new_user = {
    "name": "Tran Van ABCD",
    "email": "tvabcd@gmail.com",
    "password": "12345678",
    "repassword": "12345678",
    "avatar_url": "https://lh3.googleusercontent.com/-fWLtCjE-brE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcI4HMQaIG0nfAIg5a_Pwo5_awuUw.CMID/s64-c/photo.jpg"
};

let unrecognised_user = {
    "name": "Tran Van DEF",
    "email": "tvdef@gmail.com",
    "password": "12345678",
    "repassword": "12345678",
    "avatar_url": "https://lh3.googleusercontent.com/-fWLtCjE-brE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcI4HMQaIG0nfAIg5a_Pwo5_awuUw.CMID/s64-c/photo.jpg"
};

let wrong_password = {
    "name": "Tran Van A",
    "email": "tva@gmail.com",
    "password": "87654321",
    "repassword": "87654321",
    "avatar_url": "https://lh3.googleusercontent.com/-fWLtCjE-brE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcI4HMQaIG0nfAIg5a_Pwo5_awuUw.CMID/s64-c/photo.jpg"
};

chai.use(chaiHttp);

before((done) => {
    let userInfo = Users.getUsersByEmail(new_user.email);
    userInfo.then(async (info) => {
        if (info.length > 0) {
            await Roles.deleteRoleForUserByEmail(new_user.email);
            await Users.deleteUsersByEmail(new_user.email)
        }
    })
    done();
});

after((done) => {
    let userInfo = Users.getUsersByEmail(new_user.email);
    userInfo.then(async (info) => {
        if (info.length > 0) {
            await Roles.deleteRoleForUserByEmail(new_user.email);
            await Users.deleteUsersByEmail(new_user.email)
        }
    })
    done();
});

describe('Users', () => {

    describe('Register a user', () => {
        it('it should register a user', (done) => {
            chai.request(server)
                .post('/users/register')
                .send(new_user)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Đăng ký thông tin thành công');
                    done();
                });
        });

        it('it should not register a user with an available email', (done) => {

            chai.request(server)
                .post('/users/register')
                .send(old_user)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Email này đã được sử dụng');
                    done();
                });
        });
    })

    describe('Login', () => {
        it('it should login an user', (done) => {

            chai.request(server)
                .post('/users/login')
                .send(new_user)
                .end((err, res) => {
                    res.body.user.should.have.property('name').eql(new_user.name);
                    res.body.user.should.have.property('email').eql(new_user.email);
                    res.body.user.should.have.property('id');
                    res.body.should.have.property('access_token');
                    done();
                });
        });

        it('it should not login an unrecognised user', (done) => {

            chai.request(server)
                .post('/users/login')
                .send(unrecognised_user)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Địa chỉ Email này chưa được đăng ký');
                    done();
                });
        });

        it('it should not login an wrong password user', (done) => {

            chai.request(server)
                .post('/users/login')
                .send(wrong_password)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Mật khẩu của bạn không chính xác');
                    done();
                });
        });
    })
});


