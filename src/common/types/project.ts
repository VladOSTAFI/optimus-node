export interface IProject {
  id: ProjectIds;
  name: string;
}

export enum ProjectIds {
  Subspace = 'subspace',
  Holograph = 'holograph',
  Gear = 'gear',
  Shardeum = 'shardeum',
}
