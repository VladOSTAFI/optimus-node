import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/utils';
import { Server } from '@/models';
import { SSHClientService } from '@/services';

connectToDatabase();

export const GET = async (req: NextRequest) => {
  const serverId = req.nextUrl.searchParams.get('serverId');

  if (!serverId) {
    return NextResponse.json(
      { message: 'Server ID should be specified.' },
      { status: 400 },
    );
  }

  const server = await Server.findOne({ _id: serverId });

  if (!server) {
    return NextResponse.json(
      { message: 'Server with specified ID is not found.' },
      { status: 404 },
    );
  }

  const config = {
    host: server.ip,
    port: 22,
    username: server.username,
    password: server.password,
  };

  const sshClient = new SSHClientService();

  try {
    await sshClient.connect(config);
    await sshClient.ping();

    return NextResponse.json({ connection: true });
  } catch (err) {
    return NextResponse.json({ connection: false });
  } finally {
    await sshClient.close();
  }
};
