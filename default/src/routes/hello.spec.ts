import { Request, Response } from '@astroneer/core';
import { GET } from './hello';

describe('Hello', () => {
  it('should return greeting', () => {
    const req = {} as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;

    GET(req, res);

    expect(res.send).toHaveBeenCalledWith('Hello, from Astroneer! 🚀');
  });
});
