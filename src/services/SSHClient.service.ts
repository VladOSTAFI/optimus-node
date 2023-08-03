import { NodeSSH, Config } from 'node-ssh';

export class SSHClientService {
  private ssh: NodeSSH;

  constructor() {
    this.ssh = new NodeSSH();
  }

  async connect(sshConfig: Config) {
    try {
      await this.ssh.connect(sshConfig);
      console.log('Connected via SSH!');
    } catch (err: any) {
      console.error('Error connecting via SSH:', err.message);
      throw err;
    }
  }

  async ping() {
    try {
      const result = await this.ssh.execCommand('echo "Ping!"');
      return result.code === 0;
    } catch (err: any) {
      return false;
    }
  }

  async runCommand(command: string): Promise<string> {
    try {
      const result = await this.ssh.execCommand(command);
      console.log('Command execution completed. Exit code:', result.code);
      return result.stdout;
    } catch (err: any) {
      console.error('Error executing command:', err.message);
      throw err;
    }
  }

  async close() {
    try {
      await this.ssh.dispose();
    } catch (err: any) {
      console.error('Error closing SSH connection:', err.message);
      throw err;
    }
  }
}
