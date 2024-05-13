import { Server } from 'http';
import supertest from 'supertest';
import startServer from '../src/server';

describe('/hello', () => {
  let server: Server;

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(() => {
    server.close();
  });

  describe('GET', () => {
    it('should return greeting', async () => {
      const response = await supertest(server).get('/hello');

      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello, from Astroneer! 🚀');
    });
  });
});
