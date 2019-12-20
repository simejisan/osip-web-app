process.env.NODE_ENV = 'test';

const Functions = require("../models/roles");
const Roles = require("../models/roles");
const RolesFunc = require("../models/roles_func");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
var expect = require('chai').expect;
var superTest = require('supertest');

let token;
let new_user = {
    "email": "admin@osip.com",
    "password": "123123",
};

let func_id = "1428905072632271895";
let role_id;
let id_role_func = {
    role_id,
    func_id
}
let old_role = {
    "name": "Test role",
    "label": "Test label",
    "description": "Test desc",
    "is_changeable": 0
};

let new_role = {
    "name": "Test role 2",
    "label": "Test label 2",
    "description": "Test desc",
    "is_changeable": 0
};

var authenticatedUser = superTest.agent(server);

chai.use(chaiHttp);

before(function (done) {
    let roleInfo = Roles.checkRoleExist(new_role)
    roleInfo.then((role) => {
        if (role.length > 0) {
            let roleInfo = Functions.getRoleByName(new_role.name)
            roleInfo.then(async (role) => {
                if (role !== undefined) {
                    await Functions.deleteRoleForUser(role[0].id);
                    await RolesFunc.deleteRoleFuncByRoleId(role[0].id);
                    await Functions.deleteRole(role[0].id);
                }
            })
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
})

after(function (done) {
    let roleInfo = Roles.checkRoleExist(new_role)
    roleInfo.then((role) => {
        if (role.length > 0) {
            let roleInfo = Functions.getRoleByName(new_role.name)
            roleInfo.then(async (role) => {
                if (role !== undefined) {
                    await Functions.deleteRoleForUser(role[0].id);
                    await RolesFunc.deleteRoleFuncByRoleId(role[0].id);
                    await Functions.deleteRole(role[0].id);
                }
            })
        }
    })
    done();
})

describe('Roles', () => {

    describe('Get all functions for admin', () => {
        it('it should GET all the functions for admin', (done) => {
            chai.request(server)
                .get('/roles/admin')
                .set('Authorization', 'OSIP ' + token)
                .end((err, res) => {
                    //expect(res.body).to.have.deep.property('id');
                    //expect(res.body).to.be.an('array')
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Get all functions for member', () => {
        it('it should GET all the functions for member', (done) => {
            chai.request(server)
                .get('/roles/member')
                .set('Authorization', 'OSIP ' + token)
                .end((err, res) => {
                    //expect(res.body).to.have.deep.property('id');
                    //expect(res.body).to.be.an('array')
                    //expect(res.body).to.be.an('object')
                    //expect(res.body).to.have.property('id');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('Add new role ', () => {
        it('it should Add new role when user is logged in', (done) => {
            chai.request(server)
                .post('/roles/add')
                .set('Authorization', 'OSIP ' + token)
                .send(new_role)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Tạo role mới thành công');
                    res.should.have.status(200);
                    // let functionOfUser = Functions.deleteRoleByName(new_role.name);
                    done();
                }
                )
        });

        it('it should not Add an available role when user logged in', (done) => {
            chai.request(server)
                .post('/roles/add')
                .set('Authorization', 'OSIP ' + token)
                .send(new_role)
                .end((err, res) => {
                    res.body.should.have.property('message').eql('Đã tồn tại role');
                    done();
                }
                )
        });
    });

    describe('Update role ', () => {
        it('it should Update role when user is logged in', (done) => {
            let roleInfo = Roles.getRoleByName(new_role.name)
            roleInfo.then((role) => {
                chai.request(server)
                    .put('/roles/edit/')
                    .query({id: role[0].id})
                    .set('Authorization', 'OSIP ' + token)
                    .send(new_role)
                    .end((err, res) => {
                        res.body.should.have.property('message').eql('Cập nhật role thành công');
                        res.should.have.status(200);
                        done();
                    }
                    )
            })

        });
    });

    describe('Unassign function for Role ID', () => {
        it('it should unassign function for Role ID', (done) => {
            let roleInfo = Roles.getRoleByName(new_role.name)
            roleInfo.then((role) => {
                // Check role_id and func_id
                let assignInfo = RolesFunc.findAssignFunction(role[0].id, func_id);
                assignInfo.then((result) => {
                    if (result.length == 0) {
                        RolesFunc.assignFucntion(role[0].id, func_id);
                    }
                })
                chai.request(server)
                    .post('/roles/unassign')
                    .set('Authorization', 'OSIP ' + token)
                    .query({ role_id: role[0].id, func_id: func_id })
                    .end((err, res) => {
                        res.body.should.have.property('message').eql('Huỷ cài đặt chức năng thành công');
                        res.should.have.status(200);
                        done();
                    });
            })

        });
    });

    describe('Assign function for Role ID', () => {
        it('it should assign function for Role ID', (done) => {
            let roleInfo = Roles.getRoleByName(new_role.name)
            roleInfo.then((role) => {
                chai.request(server)
                    .post('/roles/assign')
                    .set('Authorization', 'OSIP ' + token)
                    .query({ role_id: role[0].id, func_id: func_id })
                    .end((err, res) => {
                        res.body.should.have.property('message').eql('Cài đặt chức năng thành công');
                        res.should.have.status(200);
                        done();
                    });
            })

        });
    });

    describe('Get all role', () => {
        it('it should GET all role when user is logged in', (done) => {
            chai.request(server)
                .get('/roles/all')
                .set('Authorization', 'OSIP ' + token)
                .end((err, res) => {
                    res.body.should.have.property('roles');
                    res.should.have.status(200);
                    done();
                }
                )
        });
    });
});