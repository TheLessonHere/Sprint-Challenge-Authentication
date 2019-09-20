// const request = require('supertest');
// const server = require('../index');
const Users = require('./auth-helpers');
const db = require('../database/dbConfig')

beforeEach(async()=>{
    await db('users').truncate()
})

describe('POST /api/auth/register', ()=> {
    it('should insert a new user', async ()=>{
        await Users.add({ username: 'Chelsea', password: 'newPassword' });
        const users = await db('users');
        expect(users).toHaveLength(1)
    })
});

describe('POST /api/auth/register', ()=> {
    it('should fail to insert a new user without username', async ()=>{
        await Users.add({ password: 'newPassword' });
        const users = await db('users');
        expect(users).toHaveLength(0)
    })
});

describe('POST /api/auth/login', ()=> {
    it('should find a user by username', async ()=>{
        await Users.add({ username: 'Chelsea', password: 'newPassword' });
        await Users.findBy({ username: 'Chelsea' }).first().then(user => {
            const wantedUser = user;
            expect(wantedUser).toEqual({ id: 1, username: 'Chelsea', password: 'newPassword' })
        })
    })
});

describe('POST /api/auth/login', ()=> {
    it('should find a user by ID', async ()=>{
        await Users.add({ username: 'Chelsea', password: 'newPassword' });
        await Users.findById(1).first().then(user => {
            const wantedUser = user;
            expect(wantedUser).toEqual({ id: 1, username: 'Chelsea', password: 'newPassword' })
        })
    })
});

// describe('POST /api/auth/login', ()=> {
//     it('should find a user by username', async ()=>{
//         await Users.add({ username: 'Chelsea', password: 'newPassword' });
//         return request(server)
//                 .post('/api/auth/login')
//                 .send({ username: 'Chelsea', password: 'newPassword' })
//                 .set('Accept', 'application/json')
//                 .expect('Content-Type', /json/)
//                 .expect(200)
//                 .end(function(err, res) {
//                     if (err) return done(err);
//                 });
//     });
// });