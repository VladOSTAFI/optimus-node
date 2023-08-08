import { CommonNodeService, Config } from '@/services/nodes/CommonNode.service';
import { Node } from '@/models';
import { NodeStatuses } from '@/common';

export class SubspaceNodeService extends CommonNodeService {
  private readonly RELEASE = 'gemini-3e';
  private readonly CHAIN = 'gemini-3e-2023-jul-03';
  private readonly DIR_NAME = 'subspace_docker_test';

  constructor(config: Config) {
    super(config);
  }

  async status() {
    try {
      await this.sshClient.connect(this.config);

      // TODO: implement logic to check node/farmer status
      await this.sshClient.runCommand('ls');

      return true;
    } catch (err) {
      return false;
    } finally {
      await this.sshClient.close();
    }
  }

  async restart() {
    try {
      await this.sshClient.connect(this.config);

      await this.sshClient.runCommand(
        `docker-compose -f $HOME/${this.DIR_NAME}/docker-compose.yml restart node`,
      );

      await this.sshClient.runCommand(
        `docker-compose -f $HOME/${this.DIR_NAME}/docker-compose.yml restart farmer`,
      );
    } catch (err) {
      console.error('Error[SubspaceNodeService.restart]', err);

      await this.updateNodeStatus(NodeStatuses.FAILED);
    } finally {
      await this.sshClient.close();
    }
  }

  async run() {
    try {
      await this.sshClient.connect(this.config);

      await this.sshClient.runCommand(
        `docker-compose -f $HOME/${this.DIR_NAME}/docker-compose.yml up -d`,
      );

      await this.updateNodeStatus(NodeStatuses.RUN);
    } catch (err) {
      console.error('Error[SubspaceNodeService.run]', err);

      await this.updateNodeStatus(NodeStatuses.FAILED);
    } finally {
      await this.sshClient.close();
    }
  }

  async stop() {
    try {
      await this.sshClient.connect(this.config);

      await this.sshClient.runCommand(
        `docker-compose -f $HOME/${this.DIR_NAME}/docker-compose.yml down`,
      );

      await this.updateNodeStatus(NodeStatuses.STOPPED);
    } catch (err) {
      console.error('Error[SubspaceNodeService.stop]', err);

      await this.updateNodeStatus(NodeStatuses.FAILED);
    } finally {
      await this.sshClient.close();
    }
  }

  async install() {
    try {
      await this.sshClient.connect(this.config);

      await this.createDockerCompose();

      await this.sshClient.runCommand('ls');

      await this.updateNodeStatus(NodeStatuses.INSTALLED);
    } catch (err) {
      console.error('Error[SubspaceNodeService.install]', err);

      await this.updateNodeStatus(NodeStatuses.FAILED);
    } finally {
      await this.sshClient.close();
    }
  }

  async delete() {
    try {
      await this.sshClient.connect(this.config);

      await this.sshClient.runCommand(
        `docker-compose -f $HOME/${this.DIR_NAME}/docker-compose.yml down -v`,
      );

      await this.sshClient.runCommand('rm -rf $HOME/subspace*');

      await this.deleteNode();
    } catch (err) {
      console.error('Error[SubspaceNodeService.delete]', err);

      await this.updateNodeStatus(NodeStatuses.FAILED);
    } finally {
      await this.sshClient.close();
    }
  }

  private async updateNodeStatus(status: NodeStatuses) {
    await Node.findOneAndUpdate({ _id: this.node._id }, { status });
  }

  private async deleteNode() {
    await Node.deleteOne({ _id: this.node._id });
  }

  private async createDockerCompose() {
    await this.sshClient.runCommand(`mkdir -p $HOME/${this.DIR_NAME}/`);

    await this.sshClient.runCommand(
      `
      sudo tee <<EOF >/dev/null $HOME/${this.DIR_NAME}/docker-compose.yml
        version: "3.7"
        services:
          node:
            image: ghcr.io/subspace/node:${this.RELEASE}
            volumes:
              - node-data:/var/subspace:rw
            ports:
              - "0.0.0.0:32333:30333"
              - "0.0.0.0:32433:30433"
            restart: unless-stopped
            command: [
              "--chain", "${this.CHAIN}",
              "--base-path", "/var/subspace",
              "--execution", "wasm",
              "--blocks-pruning", "archive",
              "--state-pruning", "archive",
              "--port", "30333",
              "--unsafe-rpc-external",
              "--dsn-listen-on", "/ip4/0.0.0.0/tcp/30433",
              "--rpc-cors", "all",
              "--rpc-methods", "safe",
              "--dsn-disable-private-ips",
              "--no-private-ipv4",
              "--validator",
              "--name", "${this.node.data.nodeName}",
              "--telemetry-url", "wss://telemetry.subspace.network/submit 0",
              "--telemetry-url", "wss://telemetry.doubletop.io/submit 0",
              "--out-peers", "100"
            ]
            healthcheck:
              timeout: 5s
              interval: 30s
              retries: 5
      
          farmer:
            depends_on:
              - node
            image: ghcr.io/subspace/farmer:${this.RELEASE}
            volumes:
              - farmer-data:/var/subspace:rw
            ports:
              - "0.0.0.0:32533:30533"
            restart: unless-stopped
            command: [
              "--base-path", "/var/subspace",
              "farm",
              "--disable-private-ips",
              "--node-rpc-url", "ws://node:9944",
              "--listen-on", "/ip4/0.0.0.0/tcp/30533",
              "--reward-address", "${this.node.data.walletAddress}",
              "--plot-size", "100G"
            ]
        volumes:
          node-data:
          farmer-data:
      EOF
      `,
    );
  }
}
