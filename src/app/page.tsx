'use client';

import React, { useCallback, useState } from 'react';
import {
  Alert,
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';

import { AddNodeModal, NodeList, ServerList } from '@/components';
import NodeMenu from '../components/NodeMenu/NodeMenu';

const DRAWER_WIDTH = 240;
const SERVER_LIST = [
  { id: '1', name: 'Main VPS' },
  { id: '2', name: 'My VPS' },
  { id: '3', name: 'Contabo L' },
];
const NODE_LIST = [
  { id: '1', name: 'Subspace' },
  { id: '2', name: 'Holograph' },
  { id: '3', name: 'Massa' },
];

const Home = () => {
  const [selectedServer, setSelectedServer] = useState<string | undefined>(
    SERVER_LIST[0].id || undefined,
  );
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | undefined>(
    undefined,
  );
  const [nodeToAdd, setNodeToAdd] = useState<any | undefined>(undefined);
  const [showSuccessTooltip, setShowSuccessTooltip] = useState(false);

  const handleOpenNodeMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setMenuAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleSelectNode = useCallback((id: string) => {
    setNodeToAdd(NODE_LIST.find((node) => node.id === id));
    setMenuAnchorEl(undefined);
  }, []);

  const handleAddNode = useCallback((data: any) => {
    console.log('New node', data);

    setShowSuccessTooltip(true);
  }, []);

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
        <Box
          sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}
        >
          <ServerList
            servers={SERVER_LIST}
            selectedId={selectedServer}
            onSelect={setSelectedServer}
          />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <NodeList nodes={NODE_LIST} onAddNode={handleOpenNodeMenu} />
      </Box>

      <NodeMenu
        nodes={NODE_LIST}
        disabledNodes={[NODE_LIST[1].id, NODE_LIST[2].id]}
        anchorEl={menuAnchorEl}
        open={!!menuAnchorEl}
        onSelect={handleSelectNode}
        onClose={() => setMenuAnchorEl(undefined)}
      />

      <AddNodeModal
        node={nodeToAdd}
        open={!!nodeToAdd}
        onClose={() => setNodeToAdd(undefined)}
        onAdd={handleAddNode}
      />

      <Snackbar
        open={showSuccessTooltip}
        autoHideDuration={4000}
        onClose={() => setShowSuccessTooltip(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Node has been added successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
