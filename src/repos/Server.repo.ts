import { IServer } from '@/common';

export class ServerRepo {
  static async find() {
    const res = await fetch('/api/server');
    const { data } = await res.json();
    return data as IServer[];
  }

  static async create(body: Omit<IServer, 'id'>) {
    const res = await fetch('/api/server', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const { data } = await res.json();

    return data as IServer;
  }

  static async delete(serverId: string) {
    await fetch('/api/server', {
      method: 'DELETE',
      body: JSON.stringify({ serverId }),
    });
  }
}
