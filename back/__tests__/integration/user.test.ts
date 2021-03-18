import app from '../../src/app/app';
import supertest, {Response} from 'supertest';
import truncate from '../utils/truncate';
import createUser from '../utils/createUser';

// describe('template',() => {
//   it('should be able {template}', async () => {})
// })

describe('register',() => {
  beforeAll( async () => { await truncate()});
  it('should be able create a new User', async () => {
    jest.setTimeout(20000);
    const user = await createUser();

    expect(user.status).toBe(201);
  });

  it('should be able not create a user because missing datas', async () =>{
    const res: Response = await supertest(app).post('/user').send({
      cpf: 11122233345,
      email: 'test1@test.com',
      name: 'exemple',
    });
    expect(res.status).toBe(406);
  });

  it('should be able return err 401 because alrealy exit this user', async () =>{
    const user = await createUser();
    expect(user.status).toBe(405);
  });
});

describe('list',() => {

  it('should be able list the users', async () => {
    const res: Response = await supertest(app).get('/user');
    expect(res.status).toBe(200);
  });
});

describe('delete',() => {
  beforeEach( async () => { truncate() })
  it('should be able update a existent user at database', async () => {
    jest.setTimeout(20000);
    const user = await createUser();
    const res: Response = await supertest(app).delete(`/user/${user.body.id}`);
    expect(res.status).toBe(200)
  });
  
  it('should be able not update user because not contain user with this id', async () =>{
    jest.setTimeout(20000);
    const user = await createUser();
    const res: Response = await supertest(app).delete(`/user/1`)
    expect(res.status).toBe(404)
  });
});

describe('authentication', () => {
  beforeAll( async () => { await truncate()});
  it('should be able return error because password is incorrect', async () => {
    jest.setTimeout(20000);
    const user = await createUser();
    const login: Response = await supertest(app).get('/login').auth('test@test.com', '123');
    expect(login.status).toBe(401);
  });
});