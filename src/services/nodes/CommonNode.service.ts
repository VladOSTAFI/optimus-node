import { SSHClientService } from '@/services/SSHClient.service';
import { IDBNode } from '@/models';

export interface Config {
  host: string;
  port: number;
  username: string;
  password: string;

  node: IDBNode;
}

export class CommonNodeService implements IAbstractNodeService {
  config: Config;
  sshClient: SSHClientService;

  node: IDBNode;

  constructor(config: Config) {
    this.config = config;
    this.sshClient = new SSHClientService();
    this.node = config.node;
  }

  async status() {
    return true;
  }

  async restart() {}

  async run() {}

  async stop() {}

  async install() {}

  async delete() {}
}

export interface IAbstractNodeService {
  config: Config;
  sshClient: SSHClientService;

  status(): Promise<boolean>;
  restart(): Promise<void>;
  run(): Promise<void>;
  stop(): Promise<void>;
  install(): Promise<void>;
  delete(): Promise<void>;
}
