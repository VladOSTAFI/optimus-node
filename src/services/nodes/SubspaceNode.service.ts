import { CommonNodeService, Config } from '@/services/nodes/CommonNode.service';

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
    } catch (err) {
      console.error('Error[SubspaceNodeService.run]', err);
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
    } catch (err) {
      console.error('Error[SubspaceNodeService.stop]', err);
    } finally {
      await this.sshClient.close();
    }
  }

  async install(nodeName: string, walletAddress: string) {
    try {
      await this.sshClient.connect(this.config);

      await this.createDockerCompose(nodeName, walletAddress);

      await this.sshClient.runCommand('ls');
    } catch (err) {
      console.error('Error[SubspaceNodeService.install]', err);
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
    } catch (err) {
      console.error('Error[SubspaceNodeService.delete]', err);
    } finally {
      await this.sshClient.close();
    }
  }

  private async createDockerCompose(nodeName: string, walletAddress: string) {
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
              "--name", "${nodeName}",
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
              "--reward-address", "${walletAddress}",
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
