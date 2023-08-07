import React from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import DeleteIcon from '@mui/icons-material/Delete';
import { IServer } from '@/common';

interface ServerListProps {
  servers: IServer[];
  loading?: boolean;
  selectedId?: string;

  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const ServerList: React.FC<ServerListProps> = (props) => {
  if (props.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (props.servers.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 5,
        }}
      >
        <Typography variant="h6">No servers yet</Typography>
        <Typography variant="caption" sx={{ textAlign: 'center' }}>
          Click add button to add new server
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {props.servers.map(({ id, name }) => (
        <ListItem
          key={id}
          disablePadding
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => props.onDelete(id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          }
        >
          <ListItemButton
            selected={id === props.selectedId}
            onClick={() => props.onSelect(id)}
          >
            <ListItemIcon>
              <ComputerIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ServerList;
