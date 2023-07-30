import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';

interface ServerListProps {
  servers: any[];

  selectedId?: string;
  onSelect: (id: string) => void;
}

const ServerList: React.FC<ServerListProps> = (props) => {
  return (
    <List>
      {props.servers.map(({ id, name }) => (
        <ListItem
          key={id}
          disablePadding
          selected={id === props.selectedId}
          onClick={() => props.onSelect(id)}
        >
          <ListItemButton>
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
