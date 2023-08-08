import { NextResponse, NextRequest } from 'next/server';

import { connectToDatabase } from '@/utils';
import { IDBNode, Node, Server } from '@/models';
import { INode, NodeStatuses } from '@/common';
import { Config, NodesRegistryService } from '@/services';

connectToDatabase();

const formatNodeData = (rawServerData: IDBNode): INode => ({
  id: rawServerData.id,
  name: rawServerData.name,
  projectId: rawServerData.projectId,
  serverId: rawServerData.server.id,
  status: rawServerData.status,
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
      status: NodeStatuses.INSTALLATION,
      data: nodeData.data,
    });

    const config: Config = {
      host: server.ip,
      port: 22,
      username: server.username,
      password: server.password,
      node,
    };

    const NodeService = NodesRegistryService.getNodeService(node.projectId);
    const nodeService = new NodeService(config);

    nodeService.install();

    return NextResponse.json({ data: formatNodeData(node) }, { status: 201 });
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { message: 'Something went wrong during node creation.' },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: Request) => {
  const requiredFields = ['nodeId'];

  const data = await req.json();

  if (requiredFields.some((key) => !data[key])) {
    return NextResponse.json(
      { message: 'All required field should be specified.' },
      { status: 400 },
    );
  }

  try {
    const node = await Node.findOne({ _id: data.nodeId }).populate('server');

    if (!node) {
      return NextResponse.json(
        { message: `Node with id=${data.nodeId} is not found.` },
        { status: 400 },
      );
    }

    const config: Config = {
      host: node.server.ip,
      port: 22,
      username: node.server.username,
      password: node.server.password,
      node,
    };

    const NodeService = NodesRegistryService.getNodeService(node.projectId);
    const nodeService = new NodeService(config);

    nodeService.delete();

    return NextResponse.json(null);
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      { message: 'Something went wrong during node deletion.' },
      { status: 500 },
    );
  }
};
