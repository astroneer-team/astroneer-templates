import { Request, Response } from '@astroneer/core';
import { GET, POST } from '.';
import prisma from '../../client';

describe('Dogs', () => {
  describe('GET()', () => {
    it('should return all dogs', async () => {
      const req = {} as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(prisma.dog, 'findMany').mockResolvedValue([]);

      await GET(req, res);

      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('POST()', () => {
    it('should validate request body', async () => {
      const req = {
        body: jest.fn(),
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await POST(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: expect.any(Object) });
    });

    it('should create a dog', async () => {
      const req = {
        body: jest.fn().mockResolvedValue({
          name: 'Buddy',
          age: 5,
          breed: 'Golden Retriever',
        }),
      } as unknown as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      const mock = {
        id: '1',
        name: 'Buddy',
        age: 5,
        breed: 'Golden Retriever',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.dog, 'create').mockResolvedValue(mock);

      await POST(req, res);

      expect(res.json).toHaveBeenCalledWith(mock);
    });
  });
});
