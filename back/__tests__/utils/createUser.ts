import supertest, { Response } from "supertest";
import app from "../../src/app/app";

export default async () => {
  const user: Response = await supertest(app).post('/user').send({
    cpf: 11122233345,
    email: 'test@test.com',
    name: 'exemple',
    number: 123123123,
    ocupation: 'dev',
    defaultTimeInExpedient: "08:30",
    defaultTimeInLunch: "12:00",
    defaultTimeOutExpedient: "17:30",
    defaultTimeOutLunch: "13:00"
  });
  return user;
}