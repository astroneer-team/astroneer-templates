import prisma from '@/database/prisma';
import { dogValidator } from '@/validators/dog.validator';
import { HttpError, Request, Response } from '@astroneer/core';
import { Dog } from '@prisma/client';

export async function GET(_: Request, res: Response) {
  const dogs = await prisma.dog.findMany();
  res.json(dogs);
}

export async function POST(req: Request, res: Response) {
  const { name, age, breed } = await req.body<Dog>();

  const validation = dogValidator.safeParse({ name, age, breed });

  if (!validation.success) {
    throw new HttpError(400, 'Invalid dog data', validation.error);
  }

  const dog = await prisma.dog.create({
    data: validation.data,
  });

  res.status(201).json(dog);
}
