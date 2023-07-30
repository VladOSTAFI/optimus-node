import React from 'react';
import { Menu, MenuItem } from '@mui/material';

interface NodeMenuProps
  extends Omit<React.ComponentProps<typeof Menu>, 'onSelect'> {
  nodes: any[];
  disabledNodes?: string[];

  onSelect: (id: string) => void;
}

const NodeMenu: React.FC<NodeMenuProps> = (props) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {props.nodes.map((node) => (
        <MenuItem
          key={node.id}
          onClick={() => props.onSelect(node.id)}
          disabled={props.disabledNodes?.includes(node.id)}
        >
          {node.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NodeMenu;
