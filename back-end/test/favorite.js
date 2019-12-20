process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
var expect = require('chai').expect;
var superTest = require('supertest');
const User = require('../models/users');
var Favorites = require('../models/favorites');

let token;


let new_user = {
    "email": "test10@gmail.com",
    "password": "12345678"
};
let error_id_user_to_test = '0000000000000000';
let error_id_promotion_to_test = '000000000000000000000';


let id_user;
let new_id_promotion_to_test_create = "1438023875404240644";
let id_favorite_to_test = "1441269981487567936";
let id_promotion_to_test_moderate = '1438023867015632643';
let id_promotion_to_test_delete = '1438023858627024642';
let moderatorFavorite = {
    "user_id": "1440615133192656163",
    "promotion_id": id_promotion_to_test_moderate
};

var authenticatedUser = superTest.agent(server);
chai.use(chaiHttp);


before(function (done) {

    let favoriteInfo = Favorites.findAssignPromotion(id_user,new_id_promotion_to_test_create)
    favoriteInfo.then(async (info) => {
        if (info.length > 0) {
            await Favorites.deleteFavorite(id_user, new_id_promotion_to_test_create)
        }
    })
    authenticatedUser
        .post('/users/login')
        .send(new_user)
        .end(function (err, response) {
            token = response.body.access_token;
            id_user = response.body.user.id;
            response.should.have.status(200);
            done();
        });
});

after(function (done) {

    let favoriteInfo = Favorites.findAssignPromotion(id_user,new_id_promotion_to_test_create)
    favoriteInfo.then(async (info) => {
        if (info.length > 0) {
            await Favorites.deleteFavorite(id_user, new_id_promotion_to_test_create)
        }
    })
    done();
});

describe('Get all favorites', () => {
    it('it should GET all favorites', (done) => {
        chai.request(server)
            .get('/api/favorites/all')
            .set('Authorization', 'OSIP ' + token)
            .end((err, res) => {
                    expect(res.body).to.have.deep.property('favorites');
                    res.should.have.status(200);
                    done();
                }
            )
    });
});

describe('Create favorite', () => {
    it('it should Create new favorite for user', (done) => {
        chai.request(server)
            .post('/api/favorites/assign')
            .set('Authorization', 'OSIP ' + token)
            .query({ user_id: id_user, promotion_id: new_id_promotion_to_test_create })
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Chọn mã giảm giá thành công');
                    done();
                }
            )
    });
    it('it should not Create new favorite for invalid user_id', (done) => {
        chai.request(server)
            .post('/api/favorites/assign')
            .set('Authorization', 'OSIP ' + token)
            .query({ user_id: error_id_user_to_test, promotion_id: new_id_promotion_to_test_create })
            .end((err, res) => {
                    res.body.should.have.property('message').eql('Không tìm thấy thông tin người dùng');
                    done();
                }
            )
    });
    it('it should not Create new favorite for user with invalid promotion_id', (done) => {
        chai.request(server)
            .post('/api/favorites/assign')
            .set('Authorization', 'OSIP ' + token)
            .query({ user_id: id_user, promotion_id: error_id_promotion_to_test })
            .end((err, res) => {
                    res.body.should.have.property('message').eql('Không tìm thấy thông tin mã giảm giá');
                    done();
                }
            )
    });

    it('it should not Re - Create favorite', (done) => {
        chai.request(server)
            .post('/api/favorites/assign')
            .set('Authorization', 'OSIP ' + token)
            .query({ user_id: id_user, promotion_id: id_promotion_to_test_moderate })
            .end((err, res) => {
                    res.body.should.have.property('message').eql('Người dùng đã chọn mã giảm giá này trước đây rồi');
                    done();
                }
            )
    });

    it('it should not Create new favorite for user when user did not log in', (done) => {
        chai.request(server)
            .post('/api/favorites/assign')
            //.set('Authorization', 'OSIP ' + token)
            .query({ user_id: id_user, promotion_id: error_id_promotion_to_test })
            .end((err, res) => {
                    res.body.should.have.property('message').eql('Bạn không được phép truy cập');
                    done();
                }
            )
    });
});


describe('Get specific favorite ofUser ', () => {
    it('should return a 200 response if the user is logged in', function(done){
        chai.request(server)
            .get('/api/favorites')
            .query({user_id: id_favorite_to_test})
            .set('Authorization', 'OSIP '+ token)
            .end((err,res)=>{
                    //expect(res.body).to.be.an('object').that.has.all.keys('user_id', 'promotion_id');;
                    res.should.have.status(200);
                    done();
                }
            )
    });

    it('it should not GET a favorite when user is not logged in', (done) => {
        chai.request(server)
            .get('/api/favorites/')
            .query({user_id: id_favorite_to_test})
            .end((err,res)=>{
                res.body.should.have.property('message').eql('Bạn không được phép truy cập');
                done();
            });
    });

});

describe('Update favorite', () => {
    it('it should Update favorite when user is logged in', (done) => {
        //let test_favorite = Favorites.createFavorite(id_user, id_promotion_to_test_moderate)
        chai.request(server)
            .put('/api/favorites/update')
            .query({favorite_id: id_favorite_to_test, user_id: moderatorFavorite.user_id, promotion_id: moderatorFavorite.promotion_id})
            .set('Authorization', 'OSIP ' + token)
            .end((err, res) => {
                    res.body.should.have.property('message').eql('Cập nhật thông tin yêu thích thành công');
                    res.should.have.status(200);
                    done();
                }
            )
    })

    it('it should not Update favorite from ID when user did not login', (done) => {
        chai.request(server)
            .put('/api/favorites/update')
            .query({favorite_id: id_favorite_to_test, user_id: moderatorFavorite.user_id, promotion_id: moderatorFavorite.promotion_id})
            .end((err, res) => {
                    res.body.should.have.property('message').eql('Bạn không được phép truy cập');
                    done();
                }
            )
    });
});

// describe('Delete favorite', () => {
//     it('it should DELETE favorite', (done) => {
//         let favoriteInfo = Favorites.findAssignPromotion(id_user,new_id_promotion_to_test_create)
//         favoriteInfo.then(async (info) => {
//             if (info.length > 0) {
//                 chai.request(server)
//                     .delete('/api/favorites/delete')
//                     .query({ user_id: id_user, promotion_id: new_id_promotion_to_test_create})
//                     .set('Authorization', 'OSIP ' + token)
//                     .end((err, res) => {
//                         console.log(res.body)
//                         res.should.have.status(200);
//                         res.body.should.have.property('message').eql('Người dùng hủy chọn mã giảm giá thành công');
//                         done();
//                     })
//             }
//         })
//     })
// });
