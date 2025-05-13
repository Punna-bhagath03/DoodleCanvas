import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import middleware from './middleware';
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from '@repo/common/types';
import { prismaClient } from '@repo/db/client';

const app = express();
app.use(express.json());

//signup route
app.post('/signup', async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: 'incorrect input',
    });
    return;
  }

  //db call
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      message: 'User Already exists with same details',
    });
  }
});

//sigin
app.post('/signin', async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: 'incorrect input',
    });
    return;
  }

  //DB call
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: 'Not Authorized!',
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );
  res.json({
    token,
  });
});

//Room route
app.post('/room', middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      message: 'incorrect input',
    });
    return;
  }

  //DB call
  const userId = req.userId;

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId as string,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: 'Room is alredy exists. It must be unique ',
    });
  }
});

//chat-msg-route
app.get('/chats/:roomId', async function (req, res) {
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: 'desc',
    },
    take: 50,
  });
  res.json({
    messages,
  });
});
app.listen(3001);
