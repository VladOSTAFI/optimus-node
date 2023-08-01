import { useCallback, useMemo, useState } from 'react';

import { IServer } from '@/common';
import { ServerRepo } from '@/repos';

export const useServer = () => {
  const [servers, setServers] = useState<IServer[]>([]);
  const [isInitServers, setIsInitServers] = useState(true);
  const [isFetchingServers, setIsFetchingServers] = useState(false);

  const fetchServers = useCallback(async () => {
    setIsFetchingServers(true);
    setIsInitServers(false);

    const servers = await ServerRepo.find();
    setServers(servers);

    setIsFetchingServers(false);
  }, []);

  const createServer = useCallback(async (data: Omit<IServer, 'id'>) => {
    const server = await ServerRepo.create(data);
    setServers((prevServers) => [...prevServers, server]);
  }, []);

  return useMemo(
    () => ({
      servers,
      isInitServers,
      isFetchingServers,
      fetchServers,
      createServer,
    }),
    [servers, isInitServers, isFetchingServers, fetchServers, createServer],
  );
};
