import { ProjectIds } from '@/common/types/project';

export interface INode {
  id: string;
  name: string;
  projectId: ProjectIds;
  serverId: string;
  data: any;
}
