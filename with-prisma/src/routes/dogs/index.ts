import prisma from '@/database/prisma';
import { dogValidator } from '@/validators/dog.validator';
import { HttpError } from '@astroneer/common';
import { RouteHandler } from '@astroneer/core';
import { Dog } from '@prisma/client';

export const GET: RouteHandler = async (_, res) => {
  const dogs = await prisma.dog.findMany();
  res.json(dogs);
};

export const POST: RouteHandler = async (req, res) => {
  const { name, age, breed } = await req.body<Dog>();

  const validation = dogValidator.safeParse({ name, age, breed });

  if (!validation.success) {
    throw new HttpError(400, 'Invalid dog data', validation.error);
  }

  const dog = await prisma.dog.create({
    data: validation.data,
  });

  res.status(201).json(dog);
};
