import prisma from '@/database/prisma';
import { dogValidator } from '@/validators/dog.validator';
import { HttpError } from '@astroneer/common';
import { Request, Response, RouteHandler } from '@astroneer/core';
import { Dog } from '@prisma/client';

export const GET: RouteHandler = async (req, res) => {
  const { id } = req.params;
  const dog = await prisma.dog.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!dog) {
    throw new HttpError(404, 'Dog not found');
  }

  res.json(dog);
};

export const PUT: RouteHandler = async (req, res) => {
  const { id } = req.params;
  const { name, age, breed } = await req.body<Dog>();

  const validation = dogValidator.safeParse({ name, age, breed });

  if (!validation.success) {
    throw new HttpError(400, 'Invalid dog data', validation.error);
  }

  const dog = await prisma.dog.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      age,
      breed,
    },
  });

  res.json(dog);
};

export const DELETE: RouteHandler = async (req, res) => {
  const { id } = req.params;
  await prisma.dog.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(204).send('Ok');
};
