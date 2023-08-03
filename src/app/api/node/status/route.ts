import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/utils';
import { Node, Server } from '@/models';
import { NodesRegistryService } from '@/services';

connectToDatabase();

export const GET = async (req: NextRequest) => {
  const nodeId = req.nextUrl.searchParams.get('nodeId');

  if (!nodeId) {
    return NextResponse.json(
      { message: 'Node ID should be specified.' },
      { status: 400 },
    );
  }

  const node = await Node.findOne({ _id: nodeId }).populate('server');
  if (!node) {
    return NextResponse.json(
      { message: 'Node with specified ID is not found.' },
      { status: 404 },
    );
  }

  const server = await Server.findOne({ _id: node.server._id });

  if (!server) {
    return NextResponse.json(
      { message: 'Server is not found.' },
      { status: 404 },
    );
  }

  const config = {
    host: server.ip,
    port: 22,
    username: server.username,
    password: server.password,
  };

  const NodeService = NodesRegistryService.getNodeService(node.projectId);
  const nodeService = new NodeService(config);

  const status = await nodeService.status();

  return NextResponse.json({ data: { status } });
};
