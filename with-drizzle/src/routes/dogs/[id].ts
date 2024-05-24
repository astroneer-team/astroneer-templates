import { drizzle } from '@/database/drizzle';
import { $dogs } from '@/database/schema/dogs.schema';
import { Request, Response } from '@astroneer/core';
import { sql } from 'drizzle-orm';

export async function GET(req: Request, res: Response) {
  const dog = await drizzle
    .select()
    .from($dogs)
    .where(sql`${$dogs.id} = ${req.params.id}`);

  if (!dog) {
    return res.status(404).json({ message: 'Dog not found' });
  }

  res.json(dog);
}

export async function PUT(req: Request, res: Response) {
  const { name, age, breed } = await req.body<{
    name: string;
    age: number;
    breed: string;
  }>();

  const dog = await drizzle
    .update($dogs)
    .set({ name, age, breed })
    .where(sql`${$dogs.id} = ${req.params.id}`);

  if (!dog) {
    return res.status(404).json({ message: 'Dog not found' });
  }

  res.json(dog);
}
