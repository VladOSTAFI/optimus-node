'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {
  AddNodeModal,
  AddServerModal,
  NodeList,
  NodeMenu,
  ServerList,
} from '@/components';
import { DRAWER_WIDTH, INode, IServer, ProjectIds } from '@/common';
import { useNode, useServer } from '@/hooks';

const Home = () => {
  const {
    servers,
    isFetchingServers,
    isInitServers,
    fetchServers,
    createServer,
    deleteServer,
  } = useServer();
  const { nodes, isFetchingNodes, fetchServerNodes, createNode } = useNode();

  const [selectedServerId, setSelectedServerId] = useState<string | undefined>(
    undefined,
  );
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | undefined>(
    undefined,
  );
  const [selectedProjectId, setSelectedProjectId] = useState<
    ProjectIds | undefined
  >(undefined);
  const [successTooltipMsg, setSuccessTooltipMsg] = useState('');
  const [showAddServerModal, setShowAddServerModal] = useState(false);

  const handleOpenNodeMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setMenuAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleSelectNode = useCallback((id: ProjectIds) => {
    setSelectedProjectId(id);
    setMenuAnchorEl(undefined);
  }, []);

  const handleAddNode = useCallback(
    async ({ nodeName, ...data }: Record<string, string>) => {
      if (!selectedProjectId || !selectedServerId) return;

      const nodeData: Omit<INode, 'id'> = {
        name: nodeName,
        projectId: selectedProjectId,
        serverId: selectedServerId,
        data,
      };
      await createNode(nodeData);

      setSuccessTooltipMsg('Node has been added successfully.');
    },
    [selectedProjectId, selectedServerId, createNode],
  );

  const handleAddServer = useCallback(
    async (data: Omit<IServer, 'id'>) => {
      await createServer(data);

      setSuccessTooltipMsg('Server has been added successfully.');
    },
    [createServer],
  );

  const handleDeleteServer = useCallback(
    async (id: string) => {
      await deleteServer(id);

      setSuccessTooltipMsg('Server has been deleted.');
    },
    [deleteServer],
  );

  useEffect(() => {
    if (isInitServers && !isFetchingServers) {
      fetchServers();
    }
  }, [isInitServers, isFetchingServers]);

  useEffect(() => {
    if (selectedServerId) {
      fetchServerNodes(selectedServerId);
    }
  }, [selectedServerId]);

  return (
    <Box sx={{ display: 'flex' }} id="page">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            OptimusNode
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 1 }}>
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={() => setShowAddServerModal(true)}
          >
            Add server
          </Button>
        </Box>

        <Box
          sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}
        >
          <ServerList
            loading={isInitServers || isFetchingServers}
            servers={servers}
            selectedId={selectedServerId}
            onSelect={setSelectedServerId}
            onDelete={handleDeleteServer}
          />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <NodeList
          loading={isFetchingNodes}
          isServerSelected={!!selectedServerId}
          nodes={nodes}
          onAddNode={handleOpenNodeMenu}
        />
      </Box>

      <NodeMenu
        anchorEl={menuAnchorEl}
        open={!!menuAnchorEl}
        onSelect={handleSelectNode}
        onClose={() => setMenuAnchorEl(undefined)}
      />

      <AddNodeModal
        open={!!selectedProjectId}
        onClose={() => setSelectedProjectId(undefined)}
        onAdd={handleAddNode}
      />

      <AddServerModal
        open={showAddServerModal}
        onClose={() => setShowAddServerModal(false)}
        onAdd={handleAddServer}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!successTooltipMsg}
        autoHideDuration={4000}
        onClose={() => setSuccessTooltipMsg('')}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {successTooltipMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
