import { ProjectIds } from '@/common/types/project';

export interface INode {
  id: string;
  name: string;
  projectId: ProjectIds;
  serverId: string;
  status: NodeStatuses;
  data: any;
}

export enum NodeStatuses {
  INSTALLATION = 'installation',
  INSTALLED = 'installed',
  RUN = 'run',
  STOPPED = 'stopped',
  FAILED = 'failed',
}
