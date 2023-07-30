'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';

import ServerList from '../components/ServerList/ServerList';

const DRAWER_WIDTH = 240;
const SERVER_LIST = [
  { id: '1', name: 'Main VPN' },
  { id: '2', name: 'My VPS' },
  { id: '3', name: 'Contabo L' },
];

const Home = () => {
  const [selectedServer, setSelectedServer] = useState<string | undefined>(
    SERVER_LIST[0].id || undefined,
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
        <Typography paragraph>
          Here will be data about nodes on the server
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
