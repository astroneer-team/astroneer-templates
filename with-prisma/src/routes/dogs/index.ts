import { Request, Response } from '@astroneer/core';
import { z } from 'zod';
import prisma from '../../client';

export async function GET(req: Request, res: Response) {
  const dogs = await prisma.dog.findMany();
  res.json(dogs);
}

export async function POST(req: Request, res: Response) {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  });

  const { success, data, error } = schema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error });
  }

  const dog = await prisma.dog.create({
    data: {
      name: data.name,
      age: data.age,
      breed: data.breed,
    },
  });

  res.json(dog);
}
