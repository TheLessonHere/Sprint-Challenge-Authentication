const request = require('supertest');
const server = require('../index');

describe('GET /', () => {
it('should return a 200', async ()=>{
    return request(server)
            .get('/')
            .expect(200)
            .then((res)=>{
                expect(res.body).toBeTruthy()
            })
})
});

describe('GET /', () => {
it('should return a 400', async ()=>{
    return request(server)
            .get('/api/jokes')
            .expect(400)
            .then((res)=>{
                expect(res.body.message).toBe('You shall not pass!')
            })
})
});