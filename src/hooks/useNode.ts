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

  const createNode = useCallback(async (data: Omit<INode, 'id'>) => {
    const node = await NodeRepo.create(data);
    setNodes((prevNodes) => [...prevNodes, node]);
  }, []);

  return useMemo(
    () => ({
      nodes,
      isInitNodes,
      isFetchingNodes,
      fetchServerNodes,
      createNode,
    }),
    [nodes, isInitNodes, isFetchingNodes, fetchServerNodes, createNode],
  );
};
