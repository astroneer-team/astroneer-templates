import { Server } from 'http';
import supertest from 'supertest';
import startServer from '../../src/server';
import prisma from '../../src/client';
import { Dog } from '@prisma/client';

describe('/dogs', () => {
  let server: Server;

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(() => server.close());

  describe('GET', () => {
    it('should return a list of dogs', async () => {
      jest.spyOn(prisma.dog, 'findMany').mockResolvedValue([]);

      const response = await supertest(server).get('/dogs');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST', () => {
    it('should create a new dog', async () => {
      const dog = { name: 'Fido', age: 3, breed: 'Golden Retriever' };

      jest.spyOn(prisma.dog, 'create').mockResolvedValue(dog as Dog);

      const response = await supertest(server).post('/dogs').send(dog);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dog);
    });

    it('should return a 400 if the request is invalid', async () => {
      const response = await supertest(server).post('/dogs').send({});

      expect(response.status).toBe(400);
    });
  });
});
