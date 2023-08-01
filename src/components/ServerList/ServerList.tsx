import React from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import DeleteIcon from '@mui/icons-material/Delete';

interface ServerListProps {
  servers: any[];

  selectedId?: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const ServerList: React.FC<ServerListProps> = (props) => {
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
