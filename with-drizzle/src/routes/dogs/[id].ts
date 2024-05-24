import { drizzle } from '@/database/drizzle';
import { $dogs } from '@/database/schema/dogs.schema';
import { dogValidator } from '@/validators/dog.validator';
import { HttpError, Request, Response } from '@astroneer/core';
import { sql } from 'drizzle-orm';

export async function GET(req: Request, res: Response) {
  const dog = await drizzle.query.dogs.findFirst({
    where: sql`${$dogs.id} = ${req.params.id}`,
  });

  if (!dog) {
    throw new HttpError(404, 'Dog not found');
  }

  res.json(dog);
}

export async function PUT(req: Request, res: Response) {
  const { name, age, breed } = await req.body<{
    name: string;
    age: number;
    breed: string;
  }>();

  const validation = dogValidator.safeParse({ name, age, breed });

  if (!validation.success) {
    throw new HttpError(400, 'Invalid dog data', validation.error);
  }

  const dog = await drizzle
    .update($dogs)
    .set({ name, age, breed })
    .where(sql`${$dogs.id} = ${req.params.id}`);

  res.json(dog);
}

export async function DELETE(req: Request, res: Response) {
  await drizzle.delete($dogs).where(sql`${$dogs.id} = ${req.params.id}`);
  res.status(204).send('Ok');
}
