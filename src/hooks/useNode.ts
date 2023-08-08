import { useCallback, useMemo, useState } from 'react';

import { INode } from '@/common';
import { NodeRepo } from '@/repos';

export const useNode = () => {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [isInitNodes, setIsInitNodes] = useState(true);
  const [isFetchingNodes, setIsFetchingNodes] = useState(false);

  const fetchServerNodes = useCallback(async (serverId: string) => {
    setIsFetchingNodes(true);
    setIsInitNodes(false);

    const nodes = await NodeRepo.find({ server: serverId });
    setNodes(nodes);

    setIsFetchingNodes(false);
  }, []);

  const refetchServerNodes = useCallback(async (serverId: string) => {
    const nodes = await NodeRepo.find({ server: serverId });
    setNodes(nodes);
  }, []);

  const createNode = useCallback(async (data: Omit<INode, 'id' | 'status'>) => {
    const node = await NodeRepo.create(data);
    setNodes((prevNodes) => [...prevNodes, node]);
  }, []);

  const runNode = useCallback(async (nodeId: INode['id']) => {
    await NodeRepo.run(nodeId);
  }, []);

  const deleteNode = useCallback(async (nodeId: INode['id']) => {
    await NodeRepo.delete(nodeId);
  }, []);

  return useMemo(
    () => ({
      nodes,
      isInitNodes,
      isFetchingNodes,
      fetchServerNodes,
      refetchServerNodes,
      createNode,
      runNode,
      deleteNode,
    }),
    [
      nodes,
      isInitNodes,
      isFetchingNodes,
      fetchServerNodes,
      refetchServerNodes,
      createNode,
      runNode,
      deleteNode,
    ],
  );
};
