const supertest = require('supertest')
const app = require('../src/app')
const request = supertest(app)

it('should answer in the door 3131', () => {

    return request.get('/').then(res => {
        const status = res.statusCode
        expect(status).toEqual(200)
    }).catch(err => {
        fail(err)
    })
})