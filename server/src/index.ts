import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Hello world' });
});

app.get('/players', async (request, response) => {
  const players = await prisma.player.findMany();

  return response.status(200).json({ data: players });
});

app.post('/players', async (request, response) => {
  const { name, age, position, club, country } = request.body;

  const player = await prisma.player.create({
    data: { name, age, position, club, country }
  });

  return response.status(201).json({ data: player });
});

app.put('/players/:id', async (request, response) => {
  const id = request.params.id;
  const { name, age, position, club, country } = request.body;
  const player = await prisma.player.update({
    where: { id },
    data: { name, age, position, club, country }
  });

  return response.status(201).json({ data: player });
});

app.delete('/players/:id', async (request, response) => {
  const id = request.params.id;
  await prisma.player.delete({ where: { id } });

  return response.status(200).json({ message: 'Player sucessfully deleted' });
});

app.listen(5000);
