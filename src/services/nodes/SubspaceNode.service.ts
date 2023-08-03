import { CommonNodeService, Config } from '@/services/nodes/CommonNode.service';

export class SubspaceNodeService extends CommonNodeService {
  constructor(config: Config) {
    super(config);
  }

  async status() {
    try {
      await this.sshClient.connect(this.config);

      await this.sshClient.runCommand(
        'ls',
      );

      return true;
    } catch (err) {
      return false;
    } finally {
      await this.sshClient.close();
    }
  }

  async restart() {}

  async run() {}

  async stop() {}

  async install() {}

  async delete() {}
}
