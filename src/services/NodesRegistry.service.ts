import { ProjectIds } from '@/common';

import { CommonNodeService, SubspaceNodeService } from '@/services';

export class NodesRegistryService {
  static getNodeService(projectId: ProjectIds): typeof CommonNodeService {
    return SubspaceNodeService;
  }
}
