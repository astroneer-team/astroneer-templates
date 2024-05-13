import { Server } from 'http';
import supertest from 'supertest';
import startServer from '../../src/server';
import prisma from '../../src/client';

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
});
