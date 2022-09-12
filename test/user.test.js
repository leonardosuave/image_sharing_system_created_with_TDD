const supertest = require('supertest')
const app = require('../src/app')   //Importa a instância do app
const request = supertest(app)

describe('users register', () => {
    it('Should success register an user',() => {

        //Devido o teste rodar diversas vezes é necessário diferentes emails.
        //Método para gerar emails dinâmicamente.
        let time = Date.now()
        let email = `${time}@gmail.com`

        let user = {name: 'Leonardo', email, password: '123456'};

        return request.post('/user')
        .send(user)
        .then(res => {

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email)
        
        }).catch(err => {
            fail(err)
        })
    })

    it('Shouldnt register users with empty datas', () => {
        
    })

})