import { NextResponse, NextRequest } from 'next/server';

import { connectToDatabase } from '@/utils';
import { IDBNode, Node, Server } from '@/models';
import { INode } from '@/common';

connectToDatabase();

const formatNodeData = (rawServerData: IDBNode): INode => ({
  id: rawServerData.id,
  name: rawServerData.name,
  projectId: rawServerData.projectId,
  serverId: rawServerData.server.id,
  data: rawServerData.data,
});

export const GET = async (req: NextRequest) => {
  try {
    const serverId = req.nextUrl.searchParams.get('server');
    const filter = serverId ? { server: serverId } : {};

    const nodes = await Node.find(filter).populate('server');

    return NextResponse.json({ data: nodes.map(formatNodeData) });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ data: [] });
  }
};

export const POST = async (req: Request) => {
  const requiredFields = ['name', 'projectId', 'serverId', 'data'];

  const nodeData = await req.json();

  if (requiredFields.some((key) => !nodeData[key])) {
    return NextResponse.json(
      { message: 'All required field should be specified.' },
      { status: 400 },
    );
  }

  try {
    const server = await Server.findOne({ _id: nodeData.serverId });

    if (!server) {
      return NextResponse.json(
        { message: `Server with id=${nodeData.serverId} is not found.` },
        { status: 400 },
      );
    }

    const node = await Node.create({
      name: nodeData.name,
      projectId: nodeData.projectId,
      server: server._id,
      data: nodeData.data,
    });

    return NextResponse.json({ data: formatNodeData(node) });
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { message: 'Something went wrong during node creation.' },
      { status: 500 },
    );
  }
};
