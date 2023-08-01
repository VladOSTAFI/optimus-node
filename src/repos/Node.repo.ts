import { INode } from '@/common';

export class NodeRepo {
  static async find({ server }: { server: string }) {
    const params = new URLSearchParams({ server });

    const res = await fetch(`/api/node?${params.toString()}`);
    const { data } = await res.json();

    return data as INode[];
  }

  static async create(body: Omit<INode, 'id'>) {
    const res = await fetch('/api/node', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const { data } = await res.json();

    return data as INode;
  }
}
