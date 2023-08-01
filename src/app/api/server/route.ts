import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/utils';
import { IDBServer, Node, Server } from '@/models';
import { IServer } from '@/common';

connectToDatabase();

const formatServerData = (
  rawServerData: IDBServer,
): Omit<IServer, 'password'> => ({
  id: rawServerData.id,
  name: rawServerData.name,
  ip: rawServerData.ip,
  username: rawServerData.username,
});

export const GET = async () => {
  const servers = await Server.find();

  return NextResponse.json({ data: servers.map(formatServerData) });
};

export const POST = async (req: Request) => {
  const requiredFields = ['name', 'ip', 'username', 'password'];

  const serverData = await req.json();

  if (requiredFields.some((key) => !serverData[key])) {
    return NextResponse.json(
      { message: 'All required field should be specified.' },
      { status: 400 },
    );
  }

  try {
    const server = await Server.create(serverData);

    return NextResponse.json(
      { data: formatServerData(server) },
      { status: 201 },
    );
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { message: 'Something went wrong during server creation.' },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: Request) => {
  const body = await req.json();

  if (!body.serverId) {
    return NextResponse.json(
      { message: 'Server ID should be specified.' },
      { status: 400 },
    );
  }

  await Server.findByIdAndRemove(body.serverId);
  await Node.deleteMany({ server: body.serverId });

  return NextResponse.json(null);
};
