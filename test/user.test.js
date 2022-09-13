const supertest = require('supertest')
const app = require('../src/app')   //Importa a instância do app
const request = supertest(app)

let mainUser = {name: 'Leonardo Suave', email: 'leonardo.suave15@hotmail.com', password: 'palmeiras'}

beforeAll(() => {
    //Inserir usuário Leonardo no banco
    return request.post('/user')
    .send(mainUser)
    .then(res => {})
    .catch(err => {console.log(err)})
})

afterAll(() => {
    return request.delete(`/user/${mainUser.email}`)
    .then(res => {})
    .catch(err => {console.log(err)})
})

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

        //Teste de contra espectativa.
        let user = {name: '', email: '', password: ''};

        return request.post('/user')
        .send(user)
        .then(res => {

            expect(res.statusCode).toEqual(400); // Bad request - dados inválidos
        
        }).catch(err => {
            fail(err)
        })
    })

    it('Shouldnt register users with same e-mail', () => {

        let time = Date.now()
        let email = `${time}@gmail.com`

        let user = {name: 'Leonardo', email, password: '123456'};

        return request.post('/user')
        .send(user)
        .then(res => {

            //Necessário cadastrar na primeira vez com sucesso
            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email)


                return request.post('/user')
                .send(user)
                .then(res => {
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.error).toEqual('E-mail ja cadastrado')
                }).catch(err => {
                    fail(err)
                })
        
        }).catch(err => {
            fail(err)
        })
    })

})

describe('Authentication', () => {

    it('Should return a token jwt when do success login', () => {

        return request.post('/auth')
        .send({email: mainUser.email, password: mainUser.password})
        .then(res => {
            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toBeDefined();
        }).catch(err => {
            console.log(err)
            fail(err)
        })
    })

    it('Should prevent unregistered users do success login', () => {

        return request.post('/auth')
        .send({email: 'emailqualquer@email.com', password: 'senha qualquer'})
        .then(res => {
            expect(res.statusCode).toEqual(403);
            expect(res.body.errors.email).toEqual('E-mail não cadastrado');
        }).catch(err => {
            console.log(err)
            fail(err)
        })
    })

    it('Should prevent user do login with incorrect password', () => {

        return request.post('/auth')
        .send({email: mainUser.email, password: 'senha qualquer'})
        .then(res => {
            expect(res.statusCode).toEqual(403);
            expect(res.body.errors.password).toEqual('Senha incorreto');
        }).catch(err => {
            console.log(err)
            fail(err)
        })
    })
})