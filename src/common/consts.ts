import { INode, IProject, IServer, ProjectIds } from '@/common/types';

export const PROJECTS: IProject[] = [
  { id: ProjectIds.Gear, name: 'Gear' },
  { id: ProjectIds.Holograph, name: 'Holograph' },
  { id: ProjectIds.Shardeum, name: 'Shardeum' },
  { id: ProjectIds.Subspace, name: 'Subspace' },
];

export const DRAWER_WIDTH = 240;

export const SERVER_LIST: IServer[] = [
  {
    id: '1',
    name: 'Main VPS',
    ip: '102.22.3.198',
    username: 'root',
    password: 'dsasdaWDQW213W',
  },
  {
    id: '2',
    name: 'My VPS',
    ip: '102.22.3.198',
    username: 'root',
    password: 'dsasdaWDQW213W',
  },
  {
    id: '3',
    name: 'Contabo L',
    ip: '102.22.3.198',
    username: 'root',
    password: 'dsasdaWDQW213W',
  },
  {
    id: '4',
    name: 'Contabo M',
    ip: '102.22.3.198',
    username: 'root',
    password: 'dsasdaWDQW213W',
  },
];

export const NODE_LIST: INode[] = [
  {
    id: '1',
    name: 'TopNode',
    projectId: ProjectIds.Subspace,
    serverId: '1',
    data: {},
  },
  {
    id: '2',
    name: 'Holograph',
    projectId: ProjectIds.Subspace,
    serverId: '1',
    data: {},
  },
  {
    id: '3',
    name: 'Massa',
    projectId: ProjectIds.Subspace,
    serverId: '1',
    data: {},
  },
];
