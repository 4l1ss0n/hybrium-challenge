import supertest, { Response } from "supertest";
import app from "../../src/app/app";
import createUser from "../utils/createUser";
import truncate from "../utils/truncate"

describe('create', () => {
  beforeAll( async () =>  {await truncate() });
  it('should be able create a new hour of work day', async () => {
    jest.setTimeout(10000);
    const user = await createUser();
    
    const time: Response = await supertest(app).post('/times/create').send({
     timeIn: '08:30',
     headers: {
       authorization: `Baerer ${user.body.token}`
     } 
    })
  })
})