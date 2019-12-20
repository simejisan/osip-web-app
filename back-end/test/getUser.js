process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
var expect = require('chai').expect;
var superTest = require('supertest');
const Users = require("../models/users");
const Roles = require("../models/roles");

let token;
let user_id;
let new_user = {
    "email": "testmember@gmail.com",
    "password": "123",
};

let test_delete_user = {
    "name": "Test Delete User",
    "email": "testdelete@gmail.com",
    "password": "123",
}

let moderatorUser = {
    "name": "Test Update User",
    "email": "testmember@gmail.com"
};


var authenticatedUser = superTest.agent(server);
chai.use(chaiHttp);

before(function (done) {
    let userInfo = Users.getUsersByEmail(test_delete_user.email);
    userInfo.then(async (info) => {
        if (info.length > 0) {
            await Roles.deleteRoleForUserByEmail(test_delete_user.email);
            await Users.deleteUsersByEmail(test_delete_user.email)
        }
    })
    authenticatedUser
        .post('/users/login')
        .send(new_user)
        .end(function (err, response) {
            token = response.body.access_token;
            user_id = response.body.user.id;
            response.should.have.status(200);
            done();
        });
});


after((done) => {
    let userInfo = Users.getUsersByEmail(test_delete_user.email);
    userInfo.then(async (info) => {
        if (info.length > 0) {
            await Roles.deleteRoleForUserByEmail(test_delete_user.email);
            await Users.deleteUsersByEmail(test_delete_user.email)
        }
    })
    done();
});

describe('Get specific user by ID', () => {
    it('should return a 200 response if the user is logged in', function(done){
        chai.request(server)
            .get('/users/function')
            .set('Authorization', 'OSIP '+ token)
            .end((err,res)=>{
                    expect(res.body).to.be.an('object').that.has.all.keys('user', 'functions');;
                    res.should.have.status(200);
                    done();
                }
            )
    });

    it('it should not GET a user when user is not logged in', (done) => {
        chai.request(server)
            .get('/users/function')
            .end((err,res)=>{
                res.body.should.have.property('message').eql('Bạn không được phép truy cập');
                done();
            });
    });

});

describe('Get all users', () => {
    it('it should GET all users', (done) => {
        chai.request(server)
            .get('/users/all')
            .set('Authorization', 'OSIP ' + token)
            .end((err, res) => {
                    expect(res.body).to.have.deep.property('users');
                    res.should.have.status(200);
                    done();
                }
            )
    });
});

describe('Update user', () => {
    it('it should Update user when user is logged in', (done) => {
        chai.request(server)
            .put('/users/update')
            .query({id: user_id})

            .set('Authorization', 'OSIP ' + token)
            .send(moderatorUser)
            .end((err, res) => {
                    res.body.should.have.property('message').eql('Cập nhật thông tin người dùng thành công');
                    res.should.have.status(200);
                    done();
                }
            )
    })

    it('it should not Update function from ID when user did not login', (done) => {
        chai.request(server)
            .put('/users/update')
            .query({id: user_id})
            .send(moderatorUser)
            .end((err, res) => {
                    res.body.should.have.property('message').eql('Bạn không được phép truy cập');
                    done();
                }
            )
    });
});

describe('Delete user from Email', () => {
    it('it should DELETE user with valid email', (done) => {
        let test_user = Users.createUser(test_delete_user.name, test_delete_user.email, test_delete_user.password, "1414486229885391874", "https://lh3.googleusercontent.com/-fWLtCjE-brE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcI4HMQaIG0nfAIg5a_Pwo5_awuUw.CMID/s64-c/photo.jpg")
        chai.request(server)
            .delete('/users/delete')
            .query({email: test_delete_user.email})
            .set('Authorization', 'OSIP ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Xoá thông tin người dùng thành công');
                done();
            })
    })
});
